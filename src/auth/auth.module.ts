import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaDatabaseService } from 'src/prisma-database/prisma-database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: getJwtConfig,
    inject: [ConfigService]
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaDatabaseService, ConfigService],
})
export class AuthModule {}
