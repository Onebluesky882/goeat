import { Module } from '@nestjs/common';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';

@Module({
  controllers: [OrderTableController],
  providers: [OrderTableService, ShopAccessGuard],
})
export class OrderTableModule {}
