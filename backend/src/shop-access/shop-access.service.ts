import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { employees, roles, shops } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { eq, and, inArray } from 'drizzle-orm';

@Injectable()
export class ShopAccessService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async validateShopId(shopId: string) {
    if (!shopId) {
      throw new BadRequestException('shopId is required');
    }
  }

  async validateShop(
    userId: string,
    shopId: string,
    allowRoles: string[] = ['owner', 'manager', 'staff'],
  ) {
    const isOwner = await this.db
      .select()
      .from(shops)
      .where(and(eq(shops.id, shopId), eq(shops.ownerId, userId)));

    if (isOwner.length > 0) return;

    const isEmployee = await this.db
      .select({
        employeeId: employees.id,
        roleName: roles.name,
      })
      .from(employees)
      .innerJoin(roles, eq(employees.roleId, roles.id))
      .where(
        and(
          eq(employees.shopId, shopId),
          eq(employees.employerId, userId),
          inArray(roles.name, allowRoles),
        ),
      );
    if (isEmployee.length > 0) return;

    throw new HttpException(
      'You do not have permission to access',
      HttpStatus.FORBIDDEN,
    );
  }
}
