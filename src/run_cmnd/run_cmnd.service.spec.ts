import { Test, TestingModule } from '@nestjs/testing';
import { RunCmndService } from './run_cmnd.service';

describe('RunCmndService', () => {
  let service: RunCmndService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunCmndService],
    }).compile();

    service = module.get<RunCmndService>(RunCmndService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
