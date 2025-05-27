import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ShopsModule } from './shops/shops.module';
import { TablesModule } from './tables/tables.module';
import { ImagesModule } from './images/images.module';
import { CategoryModule } from './category/category.module';
import { PagesModule } from './pages/pages.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ShopsModule,
    TablesModule,
    ImagesModule,
    CategoryModule,
    PagesModule,
  ],
  controllers: [AppController, CategoriesController],
  providers: [CategoriesService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {}
}
