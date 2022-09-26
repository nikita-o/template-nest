import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  public title!: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  public tags!: string[];
}
