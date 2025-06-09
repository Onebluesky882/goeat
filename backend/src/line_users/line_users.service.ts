import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { customers, lineUser, schema, users } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { LineUsersDto } from './line_users.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class LineUsersService {
  private readonly logger = new Logger(LineUsersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: LineUsersDto) {
    try {
      this.logger.log('Inserting lineUser...');
      const lineInsert = await this.db
        .insert(lineUser)
        .values(data)
        .onConflictDoNothing()
        .returning();

      await this.db
        .insert(users)
        .values({
          lineDisplayName: data.displayName,
          linePictureUrl: data.pictureUrl,
          lineUserId: data.userId,
        })
        .onConflictDoNothing()
        .returning();
      this.logger.log('Inserted lineUser', lineInsert);

      this.logger.log('Fetching user by lineUserId...');
      const userRecord = await this.db
        .select({ id: users.id, lineUserId: users.lineUserId })
        .from(users)
        .where(eq(users.lineUserId, data.userId))
        .limit(1);
      this.logger.log('Found user:', userRecord);

      const newCustomer = userRecord[0];
      await this.db.insert(customers).values({
        userId: newCustomer.id,
        lineUserId: newCustomer.lineUserId,
      });
      return {
        data: lineInsert,
        status: true,
      };
    } catch (error) {
      this.logger.error('Failed to create line user', error.stack || error);

      throw new HttpException(
        {
          success: false,
          message: 'An error occurred while creating the line user.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
