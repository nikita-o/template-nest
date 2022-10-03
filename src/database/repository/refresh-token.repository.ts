import { Entity } from '../helpers';
import { RefreshToken } from '../entities/refresh-token.entity';
import { DatabaseService } from '../database.service';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';

export class RefreshTokenRepository implements Entity<RefreshToken> {
  tableName = 'refresh_token';
  namesFields = {
    token: 'token',
    expDate: 'exp_date',
    genDate: 'gen_date',
    userId: 'user_id',
  };

  constructor(
    private db: DatabaseService,
    private config: ConfigService,
  ) {}

  async generateRefresh(userId: string) {
    const refreshLifetime: number = this.config.get('secure').refreshLifetime;
    const refreshLength: number = this.config.get('secure').refreshLength;
    const token: string = randomBytes(Number(refreshLength)).toString('hex');
    await this.db.create<RefreshToken>(
      this.tableName,
      {
        token,
        userId,
        expDate: new Date(new Date().getTime() + refreshLifetime),
      },
      this.namesFields,
    );
    return token;
  }

  async findValidRefresh(token: string): Promise<RefreshToken> {
    return this.db.queryOneRow(``, []);
  }

  async delete(entity: Partial<RefreshToken>) {
    await this.db.delete(this.tableName, entity, this.namesFields);
  }
}
