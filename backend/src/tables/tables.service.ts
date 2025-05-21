import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { shops, tables } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { InsetTables } from './table.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class TablesService {
  constructor(
    @Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase,
  ) {}

  async createTable(@Body() newTable: InsetTables) {
    try {
      await this.db.insert(tables).values(newTable);
      return { success: true };
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          { success: false, message: 'Table already exists.' },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the table.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTables(req: any) {
    try {
      this.db
        .select()
        .from(tables)
        .innerJoin(shops, eq(shops.id, tables.shopId))
        .where(eq(shops.ownerId, tables.shopId));
    } catch (error) {}
  }
}
