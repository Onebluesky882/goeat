import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { DatabaseModule } from 'src/database/database.module';
import { MenusController } from './menus.controller';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  controllers: [MenusController],
  providers: [MenusService, ShopAccessGuard],
})
export class MenusModule {}
