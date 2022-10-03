import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './configs';
import { FilesModule } from './modules/files/files.module';
import { SampleModule } from './modules/sample/sample.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        <TypeOrmModuleOptions>configService.get('database'),
    }),
    // my modules:
    //AuthModule,
    SampleModule,
    FilesModule,
    UserModule,
    // globals:
    CommonModule,
    DatabaseModule,
  ],
})
export class AppModule {}
