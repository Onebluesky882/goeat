import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/user.dto';
import { LineUsersDto } from 'src/line_users/line_users.dto';
import { LineUsersService } from '../line_users/line_users.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private lineUsersService: LineUsersService,
    private usersService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { access_token } = await this.authService.validateOrCreate(
      req.user,
      res,
    );

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
    try {
      const result = await this.authService.login(creds.email, creds.password);

      if (!result.success || !('access_token' in result)) {
        return {
          status: 'error',
        };
      }
      // if you want to set it as a cookie:
      res.cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 86400 * 1000,
      });

      return { access_token: result.access_token, status: 'success' };
    } catch (error) {
      console.error('login failed', error);
    }
  }
  // @Post(':id')
  // async loginByLine(
  //   @Body() body: LineUsersDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const lineUserId = await this.lineUsersService.create(body);
  //   const jwt = await this.authService.loginByLine(lineUserId);
  //   res.cookie('access_token', jwt.access_token, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 7 * 86400 * 1000,
  //   });
  //   return { success: true };
  // }

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // 1) delegate creation to the plain UsersService
    const newUser = await this.usersService.createUser(dto);

    // 2) issue a token
    const token = this.authService.signToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });
    // 3) optionally set it as a cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 86400 * 1000, // 7 days
    });
    // 4) return the token (and/or user profile)
    return {
      access_token: token,
      newUser,
      message: 'User registered successfully',
      status: 'success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { status: 'success', message: 'logout' };
  }
}
