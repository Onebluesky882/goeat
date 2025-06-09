import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LineUsersModule } from 'src/line_users/line_users.module';
dotenv.config();
if (!process.env.JWT_SECRET) {
  console.error('Missing ENV JWT_SECRET');
}

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }, // TODO: Extend the expired
    }),
    DatabaseModule,
    UsersModule,
    LineUsersModule,
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy],

  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
