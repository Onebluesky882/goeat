import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { DatabaseModule } from 'src/database/database.module';
import { ShopsController } from './shops.controller';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [ShopsService],
  controllers: [ShopsController],
})
export class ShopsModule {}
