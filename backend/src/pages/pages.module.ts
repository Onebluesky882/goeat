import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
