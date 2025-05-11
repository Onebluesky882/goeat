import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    DatabaseModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log(
      'ConfigService available variables:',
      this.configService.get('DATABASE_URL'),
    ); // Single variable log
    console.log('PORT:', this.configService.get('PORT'));
    console.log('All Config variables:', this.configService.get('')); // Log all variables to debug
  }
}
