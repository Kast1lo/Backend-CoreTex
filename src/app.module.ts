import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaDatabaseModule } from './prisma-database/prisma-database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaDatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
