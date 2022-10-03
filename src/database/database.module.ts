import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [RefreshTokenRepository],
  exports: [TypeOrmModule, RefreshTokenRepository],
})
export class DatabaseModule {}
