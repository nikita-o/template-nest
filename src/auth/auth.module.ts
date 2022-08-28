import { Module } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthSerializer } from './providers/auth.serializer';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  providers: [AuthService, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
