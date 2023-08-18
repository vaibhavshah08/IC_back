import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { AuthService } from './authservice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { cmdentity } from 'src/chatgpt/command.entity';
import { JwtService } from '@nestjs/jwt';




@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,cmdentity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {
}
