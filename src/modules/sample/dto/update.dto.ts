import { OmitType } from '@nestjs/mapped-types';
import { CreateDto } from './create.dto';

export class UpdateDto extends OmitType(CreateDto, ['title']) {}
