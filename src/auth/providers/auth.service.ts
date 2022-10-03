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
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from '../../database/entities/refresh-token.entity';
import { RefreshTokenRepository } from '../../database/repositories/refresh-token.repository';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private utilService: UtilService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private repUser: Repository<User>,
    @InjectRepository(RefreshTokenRepository)
    private repRefreshToken: RefreshTokenRepository,
  ) {}

  private generateJwt(id: string, roles: ERole[]): string {
    const actualPayload: JwtPayload = {
      sub: id,
      roles: roles,
    };
    const token: string = this.jwtService.sign(actualPayload, {
      secret: this.config.getOrThrow('secure').jwtLifetime,
      expiresIn: this.config.get('secure').jwtSecret,
    });
    return token;
  }

  private async refresh(idUser: string): Promise<string> {
    // поиск токена
    const refresh: RefreshToken | null = await this.repRefreshToken.findOneBy({
      user: { id: idUser },
    });
    if (!refresh) {
      this.logger.warn('!refresh');
      throw new UnauthorizedException('Неверный refresh токен');
    }

    // удаление токена
    const userId: string = refresh.user.id;
    await this.repRefreshToken.delete({ user: { id: idUser } });

    // создание нового токена
    const newRefresh: string = await this.repRefreshToken.generateRefresh(
      userId,
    );

    return newRefresh;
  }

  private async validateUser(
    login: string,
    password: string,
  ): Promise<any | null> {
    const user: Partial<User> = await this.userService.read(login);
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
    const accessJwt: string = this.generateJwt(user.id, [ERole.Admin]);
    const refreshToken: string = await this.refresh('1');
    return {
      accessToken: accessJwt,
      refreshToken,
    };
  }
}
