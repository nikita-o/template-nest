import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class SampleDto {
  @IsNumber()
  public id!: number;

  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  public content?: string; // optional value

  @IsDateString() // ISO 8601
  public date: string = new Date().toISOString(); // default value

  @IsString() // Change date format
  @Transform(({ value }: TransformFnParams) => String(value))
  public datetime!: string;

  @IsNotEmpty()
  public something!: string;

  @IsNumber()
  public page: number = 1;
}
