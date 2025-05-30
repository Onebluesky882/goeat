import { Module } from '@nestjs/common';
import { TableGridLayoutController } from './table-grid-layout.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';

@Module({
  providers: [ShopAccessGuard],
  controllers: [TableGridLayoutController],
})
export class TableGridLayoutModule {}
