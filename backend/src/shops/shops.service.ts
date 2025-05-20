import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Req,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema, shops, users } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { ShopInsert } from './shops.dto';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async insertNewShop(@Body() newShop: ShopInsert, req: any) {
    try {
      await this.db.insert(shops).values(newShop).returning();
      return { message: 'already create new shop' };
    } catch (error) {
      console.error('Insert failed:', error);
    }
    throw new HttpException(
      {
        success: false,
        message: 'Failed to insert new shop',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
