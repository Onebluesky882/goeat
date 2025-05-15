import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todos/todo.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    TodoModule,
    UsersModule,
    AuthModule,
    JwtConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
