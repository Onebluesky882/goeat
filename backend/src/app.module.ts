import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ShopsController } from './shops/shops.controller';
import { MenusService } from './menus/menus.service';
import { OrdersService } from './orders/orders.service';
import { CustomersService } from './customers/customers.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [UsersController, AppController, ShopsController],
  providers: [UsersService, MenusService, OrdersService, CustomersService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {}
}
