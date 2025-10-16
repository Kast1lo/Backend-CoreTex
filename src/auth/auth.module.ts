import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaDatabaseService } from 'src/prisma-database/prisma-database.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaDatabaseService],
})
export class AuthModule {}
