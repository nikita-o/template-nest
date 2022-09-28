import { CreateDto } from './create.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateDto extends OmitType(CreateDto, ['title']) {}
