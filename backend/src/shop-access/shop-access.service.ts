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
    shopId: string,
    userId: string,
    allowRoles: string[] = ['owner', 'manager', 'staff'],
  ) {
    const employeeResult = await this.db
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

    const ownerResult = await this.db
      .select()
      .from(shops)
      .where(and(eq(shops.id, shopId), eq(shops.ownerId, userId)));

    if (employeeResult.length || ownerResult.length) return;
    throw new HttpException(
      'You do not have permission to access',
      HttpStatus.FORBIDDEN,
    );
  }
}
