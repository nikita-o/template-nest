import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './storage',
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
