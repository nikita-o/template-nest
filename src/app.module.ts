import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs';
import { FilesModule } from './modules/files/files.module';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    // my modules:
    AuthModule,
    SampleModule,
    FilesModule,
    // globals:
    CommonModule,
  ],
})
export class AppModule {}
