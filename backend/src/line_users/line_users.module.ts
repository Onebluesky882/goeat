import { Module } from '@nestjs/common';
import { LineUsersController } from './line_users.controller';
import { LineUsersService } from './line_users.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [LineUsersController],
  providers: [LineUsersService],
})
export class LineUsersModule {}
