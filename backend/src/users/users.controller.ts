import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/types/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    return this.usersService.getProfile(req.user);
  }

  @Post('create-user')
  createUser(@Body() body: { email; name; id }) {
    const { email, name, id } = body;
    try {
      this.usersService.insertUser(email, name, id);
    } catch (error) {
      console.log('failed!');
    }

    return { message: 'Profile fetched successfully' };
  }
}
