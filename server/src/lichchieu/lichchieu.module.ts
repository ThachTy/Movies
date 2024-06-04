import { Module } from '@nestjs/common';
import { LichChieuController } from './lichchieu.controller';
import { LichChieuService } from './lichchieu.service';

@Module({
  controllers: [LichChieuController],
  providers: [LichChieuService],
})
export class LichChieuModule {}
