import { Module } from '@nestjs/common';
import { CrudService } from './providers/crud.service';
import { CrudController } from './controllers/crud.controller';

@Module({
  imports: [],
  providers: [CrudService],
  controllers: [CrudController],
  exports: [],
})
export class SampleModule {}
