import { Module } from '@nestjs/common';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  controllers: [OrderTableController],
  providers: [OrderTableService, ShopAccessGuard],
})
export class OrderTableModule {}
