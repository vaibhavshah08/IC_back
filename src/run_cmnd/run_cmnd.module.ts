import { Module } from '@nestjs/common';
import { RunCmndService } from './run_cmnd.service';
import { RunCmndController } from './run_cmnd.controller';

@Module({
  providers: [RunCmndService],
  controllers: [RunCmndController]
})
export class RunCmndModule {}
