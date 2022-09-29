import { Injectable } from '@nestjs/common';
import { SampleDto } from '../dto/sample.dto';
import { DateTime } from 'luxon';

@Injectable()
export class SampleService {
  sample(data: SampleDto) {
    const date: DateTime = DateTime.fromISO(data.date);
  }
}
