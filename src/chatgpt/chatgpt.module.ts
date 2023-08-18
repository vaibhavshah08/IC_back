import { Module } from '@nestjs/common';
import { ChatGPTController } from './chatgpt.controller';
import { ChatGPTService,  } from './chatgpt.service';
import { RunCmndService } from 'src/run_cmnd/run_cmnd.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { cmdentity } from './command.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/users/authservice';
import { UsersService } from 'src/users/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,cmdentity])],
  controllers: [ChatGPTController],
  providers: [ChatGPTService, RunCmndService,AuthService,UsersService],
  exports: [ChatGPTService],
})
export class ChatgptModule {}
