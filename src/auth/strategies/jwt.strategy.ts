import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from '../../configs';
import { JwtPayload } from '../interface/jwt.interface';
import { Payload } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
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
