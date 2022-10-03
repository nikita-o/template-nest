import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs';
import { FilesModule } from './modules/files/files.module';
import { SampleModule } from './modules/sample/sample.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    // my modules:
    AuthModule,
    SampleModule,
    FilesModule,
    UserModule,
    // globals:
    CommonModule,
    DatabaseModule,
  ],
})
export class AppModule {}
