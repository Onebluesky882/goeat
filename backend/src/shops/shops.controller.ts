import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopInsert } from './shops.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthRequest extends Request {
  user: AuthUser;
}
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createNewShop(@Body() newShop: ShopInsert, @Req() req: AuthRequest) {
    return this.shopsService.insertNewShop({
      ...newShop,
      ownerId: req?.user?.id,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(`:shopId`)
  getShopId(@Param('shopId') shopId: string, @Req() req: AuthRequest) {
    return this.shopsService.getShopId(shopId, req?.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getMyShops(@Req() req: AuthRequest) {
    return this.shopsService.getMyShops(req.user);
  }
}
