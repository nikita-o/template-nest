import { Controller, Get } from '@nestjs/common';
import { SampleService } from '../providers/sample.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sample')
@Controller('sample')
export class SampleController {
  constructor(private sampleService: SampleService) {}

  @Get()
  test() {
    this.sampleService.test();
  }
}
