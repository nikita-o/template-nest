import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(
    private dataSource: DataSource,
    private config: ConfigService,
  ) {
    super(RefreshToken, dataSource.createEntityManager());
  }

  async generateRefresh(userId: string) {
    const refreshLifetime: number = this.config.get('secure').refreshLifetime;
    const refreshLength: number = this.config.get('secure').refreshLength;
    const token: string = randomBytes(Number(refreshLength)).toString('hex');
    await this.save({
      token,
      user: { id: userId },
      expDate: new Date(new Date().getTime() + refreshLifetime),
    });
    return token;
  }
}
