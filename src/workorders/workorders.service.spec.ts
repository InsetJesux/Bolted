import { Test, TestingModule } from '@nestjs/testing';
import { WorkordersService } from './workorders.service';

describe('WorkordersService', () => {
  let service: WorkordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkordersService],
    }).compile();

    service = module.get<WorkordersService>(WorkordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
