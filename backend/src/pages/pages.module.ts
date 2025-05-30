import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PagesController } from './pages.controller';
import { ShopAccessGuard } from 'src/common/guards/shop-access.guard';
import { PagesService } from './pages.service';

@Module({
  imports: [DatabaseModule],
  providers: [ShopAccessGuard, PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
