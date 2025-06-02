import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { ShopsService } from 'src/shops/shops.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';
import { OrdersService } from './orders.service';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [ShopAccessGuard, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
