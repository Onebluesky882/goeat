import { Module } from '@nestjs/common';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { ValidateModule } from 'src/common/validate/validate.module';
import { DatabaseModule } from 'src/database/database.module';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [ShopAccessGuard, PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
