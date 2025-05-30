import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';

@Module({
  providers: [ShopAccessGuard],
  controllers: [OrdersController],
})
export class OrdersModule {}
