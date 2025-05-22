import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { menus, schema, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq } from 'drizzle-orm';
import { MenuInsertDto } from './menus.dto';

@Injectable()
export class MenusService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async insertData(data: MenuInsertDto, user: any) {
    try {
      const result = await this.db
        .insert(menus)
        .values({ ...data, shopId: data.shopId, createdBy: user });
      return { success: true, data: result };
    } catch (err) {
      // Optional: log full error for internal monitoring
      console.error('Insert error:', err);

      if (err?.code === '23505') {
        throw new HttpException(
          { success: false, message: 'Menu already exists.' },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the menu.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMenuMatchShopId() {
    return this.db.select().from(menus).where(eq(menus.shopId, shops.id));
  }

  //todo delete edited
}
