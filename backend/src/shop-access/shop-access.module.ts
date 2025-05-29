import { Module } from '@nestjs/common';
import { ShopAccessService } from './shop-access.service';

@Module({
  exports: [ShopAccessService],
})
export class ShopAccessModule {}
