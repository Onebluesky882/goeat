import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('google'))
  loginWithGoogle() {
    // This will redirect to Google OAuth
  }
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return {
      message: 'User info from Google',
      user: req.user,
    };
  }
}
