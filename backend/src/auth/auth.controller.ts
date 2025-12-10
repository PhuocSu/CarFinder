import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RolesGuard } from './guards/roles.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
      req,
    );

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ access_token });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.INDIVIDUAL, Role.BUSINESS, Role.AGENCY, Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req: any) {
    return {
      userId: req.user?.sub,
      username: req.user.username,
      role: req.user.role,
    };
  }

  @Public()
  @Post('refresh')
  async refresh(@Request() req: any) {
    const refresh_token = req.cookies?.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    return this.authService.refreshAccessToken(refresh_token);
  }

  //Test get automatically new access token when old access token expired 
  @UseGuards(AuthGuard)
  @Get('test-token')
  testToken(@Request() req: any) {
    return {
      message: 'Token hợp lệ!',
      user: req.user,
      timestamp: new Date().toISOString(),
    };
  }
}
