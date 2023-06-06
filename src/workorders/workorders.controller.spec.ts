import { Test, TestingModule } from '@nestjs/testing';
import { WorkordersController } from './workorders.controller';
import { WorkordersService } from './workorders.service';

describe('WorkordersController', () => {
  let controller: WorkordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkordersController],
      providers: [WorkordersService],
    }).compile();

    controller = module.get<WorkordersController>(WorkordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
