import { MiddlewareConsumer, Module,ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { ChatgptModule } from './chatgpt/chatgpt.module';
import { RunCmndModule } from './run_cmnd/run_cmnd.module';
import { ChatGPTService } from './chatgpt/chatgpt.service';
import { RunCmndService } from './run_cmnd/run_cmnd.service';
import { UsersService } from './users/user.service';
import { AuthService } from './users/authservice';
import { cmdentity } from './chatgpt/command.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './users/constants';
import { AuthGuard } from './guards/auth.guards';
import { FileModule } from './file/file.module';
const cookieSession = require('cookie-session');
import * as dotenv from 'dotenv';
import { MulterModule } from '@nestjs/platform-express';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    JwtModule.register({
      global: true,
      secret: "helloiamvaibhav",
      signOptions: { expiresIn: '1h' },
    }),
    
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
      host: 'localhost',
      port: 9301,
      username: 'vaibhav_shah',
      password: 'shah@9301',
      database: 'example_1', // Replace with your database name
      entities: [UserEntity,cmdentity],
      synchronize: true,

      }
    ),UsersModule,ChatgptModule,RunCmndModule,TypeOrmModule.forFeature([UserEntity,cmdentity]), FileModule],
  controllers: [AppController],
  providers: [AppService,ChatGPTService,RunCmndService,UsersService,AuthService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    }),
  },
  // {
  //   provide: APP_GUARD,
  //   useClass: AuthGuard,
  // },
],
})
export class AppModule 
{
  constructor(private configService: ConfigService){}
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
