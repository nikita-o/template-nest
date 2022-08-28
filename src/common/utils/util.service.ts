import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class UtilService {
  getHash(text: string): string {
    return createHash('md5').update(text).digest('hex');
  }
}
