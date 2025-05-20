import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopInsert } from './shops.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { users } from '../database/schema/users';

interface AuthRequest extends Request {
  email: string;
  id: string;
  name: string;
}
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createNewShop(@Body() newShop: ShopInsert, @Req() req: AuthRequest) {
    return this.shopsService.insertNewShop(newShop, req.user);
  }
}
