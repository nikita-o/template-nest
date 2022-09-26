import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt.interface';
import { Payload } from '../interface/payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow('secretKey'),
    });
  }

  public async validate(payload: JwtPayload): Promise<Payload> {
    const user = payload.sub; // search user in database
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: '', username: '', roles: [] };
  }
}
