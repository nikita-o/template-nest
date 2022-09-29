import { ApiProperty } from '@nestjs/swagger';

export class CommonLoginResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;
}
