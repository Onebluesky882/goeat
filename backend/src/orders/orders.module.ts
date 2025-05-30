import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { ShopsService } from 'src/shops/shops.service';

@Module({
  providers: [ShopAccessGuard, ShopsService],
  controllers: [OrdersController],
})
export class OrdersModule {}
