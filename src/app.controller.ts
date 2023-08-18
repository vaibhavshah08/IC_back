import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Session, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { serialize } from './interceptors/serialize.interceptor';
import { Userdto } from './users/dtos/user.dto';
import { ChatGPTService } from './chatgpt/chatgpt.service';
import { getAiModelAnswer } from './chatgpt/model/get-ai-model-answer';
import { RunCmndService } from './run_cmnd/run_cmnd.service';
import { AuthService } from './users/authservice';
import { UsersService } from './users/user.service';
import { CreateUserdto } from './users/dtos/create-user-dto';
import { AuthGuard } from './guards/auth.guards';



@Controller('insta_cmd')
@serialize(Userdto)

@Controller()
export class AppController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    
    ) {}
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      
      return req.user;
    }
  
    @Post('/signout')
    signOut(@Session() Session: any){
        Session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserdto, @Session() session: any){
        const user = await this.authService.signup(body.email, body.password);
        return user;
    }

    @Post('/login')
    async signin(@Body() body: CreateUserdto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        return user;
    }
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException('User not Found!!');
        }
        return user;
    }

    @Get()
    findAllusers(@Query('email') email:string)
    {
      return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string)
    {
      return this.userService.remove(parseInt(id));
    }


    
  
    

  
}
