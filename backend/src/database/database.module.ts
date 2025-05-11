import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DATABASE_CONNECTION } from './database-connection';
import { schema } from './schema';

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });
        const connectionString = pool.options.connectionString;
        if (!connectionString) {
          throw new Error('DATABASE_URL is not defined in the configuration');
        }
        return drizzle(connectionString, { schema });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
