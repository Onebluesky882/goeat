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

import { AuthRequest } from 'types/auth';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //@UseGuards(ShopAccessGuard)
  @Post()
  @Roles('manager', 'staff', 'owner', 'customer')
  create(@Body() body: CreateOrderDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    const { shopId, customerId } = body;

    return this.ordersService.create(
      body,
      userId,
      shopId,
      customerId as string,
    );
  }
  //getAll
  //@UseGuards(ShopAccessGuard)
  @Get()
  @Roles('customer', 'manager', 'owner')
  getAll(@Query('shopId') shopId: string) {
    return this.ordersService.getAll(shopId);
  }
  // get by id
  //@UseGuards(ShopAccessGuard)
  @Roles()
  @Get(':id')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.ordersService.getById(id, shopId);
  }

  // update
  //@UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'staff', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: UpdateOrderDto,
    @Query('shopId') shopId: string,
  ) {
    return this.ordersService.update(id, body, shopId);
  }

  // delete
  //@UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.ordersService.delete(id, shopId);
  }
}
