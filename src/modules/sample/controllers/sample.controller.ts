import { Body, Controller, Get } from '@nestjs/common';
import { SampleService } from '../providers/sample.service';
import { ApiTags } from '@nestjs/swagger';
import { SampleDto } from '../dto/sample.dto';

@ApiTags('sample')
@Controller('sample')
export class SampleController {
  constructor(private sampleService: SampleService) {}

  @Get('sample')
  sample(@Body() data: SampleDto) {
    this.sampleService.sample(data);
  }
}
