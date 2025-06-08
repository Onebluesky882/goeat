import { Module } from '@nestjs/common';
import { LineUsersController } from './line_users.controller';
import { LineUsersService } from './line_users.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  controllers: [LineUsersController],
  providers: [LineUsersService],
})
export class LineUsersModule {}
