import { Test, TestingModule } from '@nestjs/testing';
import { RunCmndController } from './run_cmnd.controller';

describe('RunCmndController', () => {
  let controller: RunCmndController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunCmndController],
    }).compile();

    controller = module.get<RunCmndController>(RunCmndController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
