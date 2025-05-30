import { Module } from '@nestjs/common';
import { TableGridLayoutController } from './table-grid-layout.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { TableGridLayoutService } from './table-grid-layout.service';

@Module({
  providers: [ShopAccessGuard, TableGridLayoutService],
  controllers: [TableGridLayoutController],
})
export class TableGridLayoutModule {}
