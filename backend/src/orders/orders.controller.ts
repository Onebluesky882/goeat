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
  BadRequestException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'src/types/auth';
import { OrdersService } from './orders.service';
import { CreateOrder, InsertOrders, UpdateOrder } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  private validateShopId(shopId: string) {
    if (!shopId) {
      throw new BadRequestException('shopId is required');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  //create
  @Post()
  create(@Body() body: CreateOrder, @Req() req: AuthRequest) {
    const userId = req.user.id;
    const { shopId } = body;
    this.validateShopId(shopId as string);
    return this.ordersService.create(body, userId, shopId as string);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Req() req: AuthRequest, @Query('shopId') shopId: string) {
    this.validateShopId(shopId);
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
    this.validateShopId(shopId);
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
    this.validateShopId(shopId);
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
    this.validateShopId(shopId);
    const userId = req.user.id;
    return this.ordersService.delete(id, userId, shopId);
  }
}
