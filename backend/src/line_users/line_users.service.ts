import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { lineUser, schema } from 'src/database';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { LineUsersDto } from './line_users.dto';

@Injectable()
export class LineUsersService {
  private readonly logger = new Logger(LineUsersService.name);
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: LineUsersDto) {
    try {
      const insert = await this.db
        .insert(lineUser)
        .values(data)
        .onConflictDoNothing()
        .returning();
      return {
        data: insert,
        status: true,
      };
    } catch (error) {
      this.logger.error('Failed to create line user', error.stack);

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
