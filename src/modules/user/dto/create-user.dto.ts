import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;
  @IsString()
  name: string;
  @IsEmail()
  email?: string;
}
