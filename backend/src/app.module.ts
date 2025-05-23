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
import { MenusController } from './menus/menus.controller';
import { ShopsModule } from './shops/shops.module';
import { TablesService } from './tables/tables.service';
import { TablesModule } from './tables/tables.module';
import { MenuPhotosModule } from './menu-photos/menu-photos.module';
import { ImagesService } from './images/images.service';
import { ImagesController } from './images/images.controller';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ShopsModule,
    TablesModule,
    MenuPhotosModule,
    ImagesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {}
}
