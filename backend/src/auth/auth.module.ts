import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';

if (!process.env.JWT_SECRET) {
  console.error('Missing ENV JWT_SECRET');
}

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '72h' }, // TODO: Extend the expired
    }),
    DatabaseModule,
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
