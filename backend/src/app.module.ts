import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ShopsModule } from './shops/shops.module';
import { TablesModule } from './tables/tables.module';
import { ImagesModule } from './images/images.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { OrderTableModule } from './order-table/order-table.module';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { EmployeesModule } from './employees/employees.module';
import { TableGridLayoutService } from './table-grid-layout/table-grid-layout.service';
import { TableGridLayoutModule } from './table-grid-layout/table-grid-layout.module';
import { ShopAccessService } from './shop-access/shop-access.service';
import { ShopAccessModule } from './shop-access/shop-access.module';
import { UserPermissionsModule } from './user-permissions/user-permissions.module';
import { RbacModule } from './rbac/rbac.module';
import { PaginationService } from '../utils/pagination/pagination.service';
import { PaginationModule } from '../utils/pagination/pagination.module';
import { EmployersService } from './employers/employers.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ShopsModule,
    TablesModule,
    ImagesModule,
    PagesModule,
    CategoriesModule,
    OrdersModule,
    CustomersModule,
    OrderTableModule,
    RolesModule,
    EmployeesModule,
    TableGridLayoutModule,
    ShopAccessModule,
    UserPermissionsModule,
    RbacModule,
    PaginationModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    CustomersController,
    RolesController,
  ],
  providers: [
    CategoriesService,
    RolesService,
    TableGridLayoutService,
    ShopAccessService,
    PaginationService,
    EmployersService,
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {}
}
