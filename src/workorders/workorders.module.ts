import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkordersService } from './workorders.service';
import { WorkordersController } from './workorders.controller';
import { Workorder } from './entities/workorder.entity';

@Module({
  controllers: [WorkordersController],
  providers: [WorkordersService],
  imports: [TypeOrmModule.forFeature([Workorder])],
})
export class WorkordersModule {}
