import { Controller } from '@nestjs/common';
import { PrismaDatabaseService } from './prisma-database.service';

@Controller('prisma-database')
export class PrismaDatabaseController {
  constructor(private readonly prismaDatabaseService: PrismaDatabaseService) {}
}
