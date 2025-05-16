import { Injectable, Inject } from '@nestjs/common';
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

  async insertData(data: MenuInsertDto) {
    return this.db.insert(menus).values(data).returning();
  }

  async getMenuMatchShopId() {
    return this.db.select().from(menus).where(eq(menus.shopId, shops.id));
  }

  //todo delete edited
}
