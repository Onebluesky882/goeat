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
import { eq } from 'drizzle-orm';

@Injectable()
export class ShopsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // create new shop
  async insertNewShop(@Body() newShop: ShopInsert) {
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

  // get my shop
  async getMyShop(req: any) {
    try {
      const shopsData = await this.db
        .select({ name: shops.name })
        .from(shops)
        .where(eq(users.id, shops.ownerId));
      return {
        success: true,
        data: shopsData,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to get name shop',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
