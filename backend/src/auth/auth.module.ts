import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '../jwt/jwt.module';
import { DatabaseModule } from 'src/database/database.module';
import { GoogleStrategy } from './google.strategy';
@Module({
  imports: [JwtConfigModule, DatabaseModule],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
