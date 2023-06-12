import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { ProvincesController } from './provinces.controller';
import { Province } from './entities/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProvincesController],
  providers: [ProvincesService],
  imports: [TypeOrmModule.forFeature([Province])],
  exports: [TypeOrmModule],
})
export class ProvincesModule {}
