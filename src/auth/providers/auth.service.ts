import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { UserService } from '../../modules/user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { UtilService } from '../../common/utils/util.service';
import { CommonLoginResponseDto } from '../dto/common-login-response.dto';
import { UserSignDto } from '../dto/user-sign.dto';
import { ERole } from '../../common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt.interface';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private config: ConfigService,
    private userService: UserService,
    private utilService: UtilService,
    private jwtService: JwtService,
  ) {}

  private generateJwt(id: string, roles: ERole[]): string {
    const jwtLifetime: number = this.config.getOrThrow('secure').jwtLifetime;
    const jwtSecret: string = this.config.get('secure').jwtSecret;

    const actualPayload: JwtPayload = {
      sub: id,
      roles: roles,
    };
    const token: string = this.jwtService.sign(actualPayload, {
      secret: jwtSecret,
      expiresIn: jwtLifetime,
    });
    return token;
  }

  private generateRefreshToken(idUser: string): string {
    const refreshLifetime: number = this.config.get('secure').refreshLifetime;
    const refreshLength: number = this.config.get('secure').refreshLength;
    // save to database
    return randomBytes(Number(refreshLength)).toString('hex');
  }

  async validateUser(email: string, password: string): Promise<any | null> {
    this.logger.debug('validateUser');
    const user = await this.userService.read(email);
    const passwordHash = this.utilService.getHash(password);
    if (user && user.passwordHash === passwordHash) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async registration(data: CreateUserDto): Promise<void> {
    this.logger.debug('registration');
    // maybe there will be some processing
    await this.userService.create(data);
  }

  async signIn(data: UserSignDto): Promise<CommonLoginResponseDto> {
    const accessJwt: string = this.generateJwt('1', [ERole.Admin]);
    const refreshToken: string = this.generateRefreshToken('1');
    return {
      accessToken: accessJwt,
      refreshToken,
    };
  }
}
