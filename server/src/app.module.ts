import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UserModule } from '@src/user/user.module';
import { AuthModule } from '@src/auth/auth.module';
import { MovieModule } from '@src/movie/movie.module';
import { RapModule } from '@src/rap/rap.module';
import { DatVeModule } from '@src/datve/datve.module';
import { LichChieuModule } from '@src/lichchieu/lichchieu.module';

@Module({
  imports: [UserModule, MovieModule, RapModule, DatVeModule, LichChieuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
