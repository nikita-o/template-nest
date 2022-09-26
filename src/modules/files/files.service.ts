import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FilesService {
  private logger: Logger = new Logger(FilesService.name);

  loadFiles(files: Array<Express.Multer.File>): void {
    this.logger.debug(files);
  }
}
