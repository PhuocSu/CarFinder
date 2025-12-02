import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto, @Request() req: any) {
    return this.authService.signIn(signInDto.username, signInDto.password, req);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.INDIVIDUAL, Role.BUSINESS, Role.AGENCY, Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req: any) {
    return {
      userId: req.user?.sub,
      username: req.user.username,
      role: req.user.role
    }
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
      return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }
}
