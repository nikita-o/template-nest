import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../providers/auth.service';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { UserSignDto } from '../dto/user-sign.dto';
import { CommonLoginResponseDto } from '../dto/common-login-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() data: CreateUserDto): Promise<void> {
    return this.authService.registration(data);
  }

  @Post('sign-in')
  async signIn(@Body() data: UserSignDto): Promise<CommonLoginResponseDto> {
    return await this.authService.signIn(data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('check')
  checkAuth() {
    return true;
  }
}
