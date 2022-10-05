import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs';
import { FilesModule } from './modules/files/files.module';
import { SampleModule } from './modules/sample/sample.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // my modules:
    AuthModule,
    SampleModule,
    FilesModule,
    // globals:
    CommonModule,
  ],
})
export class AppModule {}
