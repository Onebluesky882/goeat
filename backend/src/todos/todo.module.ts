import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { DatabaseModule } from 'src/database/database.module';
import { TodoController } from './todo.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
