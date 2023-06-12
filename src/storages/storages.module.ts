import { Module } from '@nestjs/common';
import { StoragesService } from './storages.service';
import { StoragesController } from './storages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';

@Module({
  controllers: [StoragesController],
  providers: [StoragesService],
  imports: [TypeOrmModule.forFeature([Storage])],
})
export class StoragesModule {}
