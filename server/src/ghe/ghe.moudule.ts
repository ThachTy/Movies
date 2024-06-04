import { Module } from '@nestjs/common';
import { GheController } from './ghe.controller';
import { GheService } from './ghe.service';
@Module({
  controllers: [GheController],
  providers: [GheService],
})
export class GheModule {}
