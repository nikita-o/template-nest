import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { UserService } from '../../modules/user/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UtilService } from '../../common/utils/util.service';
import { CommonLoginResponseDto } from '../dto/common-login-response.dto';
import { UserSignDto } from '../dto/user-sign.dto';
import { ERole } from '../../common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { randomBytes } from 'crypto';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../../database/schemas/refresh-token.schema';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private utilService: UtilService,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  private generateJwt(id: string, role: ERole): string {
    const jwtLifetime: number = this.config.getOrThrow('secure').jwtLifetime;
    const jwtSecret: string = this.config.get('secure').jwtSecret;
    const actualPayload: JwtPayload = {
      sub: id,
      role: role,
    };
    const token: string = this.jwtService.sign(actualPayload, {
      secret: jwtSecret,
      expiresIn: jwtLifetime,
    });
    return token;
  }

  private async generateRefreshToken(idUser: string): Promise<string> {
    // поиск токена
    const refresh: RefreshToken | null =
      await this.refreshTokenModel.findOneAndDelete({
        user: idUser,
      });
    if (!refresh) {
      this.logger.warn('!refresh');
      throw new UnauthorizedException('Неверный refresh токен');
    }

    const refreshLifetime: number = this.config.get('secure').refreshLifetime;
    const refreshLength: number = this.config.get('secure').refreshLength;
    const token: string = randomBytes(Number(refreshLength)).toString('hex');
    await this.refreshTokenModel.create({
      token,
      expDate: new Date(new Date().getTime() + refreshLifetime),
      user: idUser,
    });
    return token;
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<any | null> {
    const user: Partial<User> | null = await this.userService.read(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordHash = this.utilService.getHash(password);
    if (user.passwordHash === passwordHash) {
      delete user.passwordHash;
      return user;
    }
    throw new UnauthorizedException('неверный логин или пароль');
  }

  async registration(data: CreateUserDto): Promise<void> {
    // перед созданием возможно будет какая то обработка
    await this.userService.create(data);
  }

  async signIn(data: UserSignDto): Promise<CommonLoginResponseDto> {
    const user: any = this.validateUser(data.login, data.password);
    const accessJwt: string = this.generateJwt(user.id, ERole.Admin);
    const refreshToken: string = await this.generateRefreshToken('1');
    return {
      accessToken: accessJwt,
      refreshToken,
    };
  }
}
