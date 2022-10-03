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
import { RefreshTokenRepository } from '../../database/repository/refresh-token.repository';
import { User } from '../../database/entities/user.entity';
import { RefreshToken } from '../../database/entities/refresh-token.entity';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private utilService: UtilService,
    private jwtService: JwtService,
    private refreshTokenRep: RefreshTokenRepository,
  ) {}

  private generateJwt(id: string, role: ERole): string {
    const actualPayload: JwtPayload = {
      sub: id,
      role: role,
    };
    const token: string = this.jwtService.sign(actualPayload, {
      secret: this.config.get('secure').jwtSecret,
      expiresIn: this.config.getOrThrow('secure').jwtLifetime,
    });
    return token;
  }

  private async refresh(token: string): Promise<string> {
    // поиск токена
    const refresh: RefreshToken = await this.refreshTokenRep.findValidRefresh(
      token,
    );
    if (!refresh) {
      this.logger.warn('!refresh');
      throw new UnauthorizedException('Неверный refresh токен');
    }

    // удаление токена
    const userId: string = refresh.userId;
    await this.refreshTokenRep.delete({ userId });

    // создание нового токена
    const newRefresh: string = await this.refreshTokenRep.generateRefresh(
      userId,
    );

    return newRefresh;
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<any | null> {
    const user: Partial<User> = await this.userService.read({
      username: login,
    });
    const passwordHash = this.utilService.getHash(password);
    if (user && user.passwordHash === passwordHash) {
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
    const accessToken: string = this.generateJwt(user.id, ERole.Admin);
    const refreshToken: string = await this.refresh('1');
    return {
      accessToken,
      refreshToken,
    };
  }
}
