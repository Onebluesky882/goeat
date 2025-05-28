import { Module } from '@nestjs/common';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';

@Module({
  controllers: [OrderTableController],
  providers: [OrderTableService]
})
export class OrderTableModule {}
