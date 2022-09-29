import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserPayload } from '../interface/user-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow('secure').jwtSecret,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPayload> {
    const user: any = payload.sub; // search user in database
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: user.id, username: user.username, roles: user.roles };
  }
}
