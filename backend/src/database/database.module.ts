import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { DATABASE_CONNECTION } from './database-connection';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as dotenv from 'dotenv';
import * as schema from '../database';
import { DbService } from './database.service';

console.log('🟡 Top of database.module.ts');
dotenv.config();
console.log('🟢 After dotenv.config');
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        console.log('🟣 Inside useFactory');
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });

        console.log('schema keys:', Object.keys(schema));
        return drizzle(pool, { schema });
      },
      inject: [ConfigService],
    },
    DbService,
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
