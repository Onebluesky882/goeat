import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { access_token } = await this.auth.validateOrCreate(req.user, res);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.redirect(
      process.env.FRONTEND_REDIRECT_URL ?? 'http://localhost:5173/controller',
    );
  }
  @Post('login')
  async login(
    @Body() creds: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.auth.login(creds.email, creds.password);

    // if you want to set it as a cookie:
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 86400 * 1000,
    });

    return { access_token };
  }

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 1) delegate creation to the plain UsersService
    const user = await this.usersService.createUser(dto);
    // 2) issue a token
    const token = this.auth.signToken({
      id: user.id,
      email: user.email,
      name: user.name ?? '',
    });
    // 3) optionally set it as a cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 86400 * 1000, // 7 days
    });
    // 4) return the token (and/or user profile)
    return { access_token: token, user };
  }
}
