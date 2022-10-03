import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserRepository } from './repository/user.repository';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Global()
@Module({
  providers: [DatabaseService, UserRepository, RefreshTokenRepository],
  exports: [UserRepository, RefreshTokenRepository],
})
export class DatabaseModule {}
