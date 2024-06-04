import { Module } from '@nestjs/common';
import { RapController } from './rap.controller';
import { RapService } from './rap.service';
import { LichChieuModule } from '@src/lichchieu/lichchieu.module';

@Module({
  imports: [LichChieuModule],
  controllers: [RapController],
  providers: [RapService],
})
export class RapModule {}
