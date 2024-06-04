import { Module } from '@nestjs/common';
import { DatVeController } from './datve.controller';
import { DatVeService } from './datve.service';
import { GheModule } from '@src/ghe/ghe.moudule';
@Module({
  imports: [GheModule],
  controllers: [DatVeController],
  providers: [DatVeService],
})
export class DatVeModule {}
