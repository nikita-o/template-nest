import { Module } from '@nestjs/common';
import { CrudService } from './providers/crud.service';
import { CrudController } from './controllers/crud.controller';
import { SampleService } from './providers/sample.service';
import { SampleController } from './controllers/sample.controller';

@Module({
  imports: [],
  providers: [CrudService, SampleService],
  controllers: [CrudController, SampleController],
  exports: [],
})
export class SampleModule {}
