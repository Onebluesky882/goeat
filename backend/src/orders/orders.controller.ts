import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'src/types/auth';
import { OrdersService } from './orders.service';
import { CreateOrder, UpdateOrder } from './orders.dto';
import { ShopAccessService } from 'src/shop-access/shop-access.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly shopAccess: ShopAccessService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(@Body() body: CreateOrder, @Req() req: AuthRequest) {
    const userId = req.user.id;
    const { shopId } = body;
    this.shopAccess.validateShopId(shopId as string);
    return this.ordersService.create(body, userId, shopId as string);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest, @Query('shopId') shopId: string) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.ordersService.getAll(shopId, userId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.ordersService.getById(id, userId, shopId);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateOrder,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.ordersService.update(id, body, userId, shopId);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    this.shopAccess.validateShopId(shopId);
    const userId = req.user.id;
    return this.ordersService.delete(id, userId, shopId);
  }
}
