import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';

@Module({
  providers: [MenusService, ShopAccessGuard],
})
export class MenusModule {}
