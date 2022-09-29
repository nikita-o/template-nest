import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserRepository } from './repository/user.repository';

@Module({
  providers: [DatabaseService, UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
