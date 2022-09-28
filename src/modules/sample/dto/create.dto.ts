import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty()
  @IsString()
  public title!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly content?: string;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
