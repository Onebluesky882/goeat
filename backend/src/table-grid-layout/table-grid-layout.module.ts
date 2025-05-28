import { Module } from '@nestjs/common';
import { TableGridLayoutController } from './table-grid-layout.controller';

@Module({
  controllers: [TableGridLayoutController]
})
export class TableGridLayoutModule {}
