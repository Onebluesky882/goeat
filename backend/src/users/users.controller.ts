import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/types/auth';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: AuthRequest) {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getPictureById(@Param('id') id: string) {
    return this.getPictureById(id);
  }
}
