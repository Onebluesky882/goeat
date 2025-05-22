import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { schema, shops, users } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { ShopInsert } from './shops.dto';
import { eq, and } from 'drizzle-orm';

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

  // get shop by id
  async getShopId(shopId: string, user: any) {
    try {
      const shopsData = await this.db
        .select({ name: shops.name })
        .from(shops)
        .where(
          and(
            // ✅ check shopId matches
            eq(shops.id, shopId),
            // ✅ check user is the owner
            eq(shops.ownerId, user.id),
          ),
        )
        .limit(1);
      return {
        success: true,
        data: shopsData[0],
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to get  shop by Id',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyShops(user: any) {
    try {
      const result = await this.db
        .select()
        .from(shops)
        .where(eq(shops.ownerId, user.id));
      return result;
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to get your shops ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
