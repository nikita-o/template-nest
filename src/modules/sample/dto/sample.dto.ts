import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SampleDto {
  @ApiProperty()
  @IsNumber()
  public id!: number;

  @ApiProperty()
  @IsString()
  public title!: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public content?: string; // optional value

  @ApiProperty()
  @IsDateString() // ISO 8601
  public date: string = new Date().toISOString(); // default value

  @ApiProperty()
  @IsNotEmpty()
  public something!: string;

  @ApiProperty()
  @IsNumber()
  public page: number = 1;
}
