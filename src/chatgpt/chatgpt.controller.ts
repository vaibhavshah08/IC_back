import { Controller, Post, Body, Request, UseGuards} from '@nestjs/common';
import { ChatGPTService } from './chatgpt.service';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { getAiModelAnswer } from './model/get-ai-model-answer';
import { RunCmndService } from 'src/run_cmnd/run_cmnd.service';
import { AuthService } from 'src/users/authservice';
import { AuthGuard } from 'src/guards/auth.guards';

@Controller('insta_cmd')
export class ChatGPTController {
    constructor(private readonly appService: RunCmndService,
        private readonly service: ChatGPTService,
        private readonly auth:AuthService){

    }

    @UseGuards(AuthGuard)
    @Post('/install')
    async installcommands(@Request() req, @Body() data: getAiModelAnswer)
    {  
      const userId = req.user.id
      const result  =await this.service.getModelAnswer(data.name,data.location, data.prompt);
      const resultString = String(result[0])
      let resultArray:string[]=result[1] as string[]
      // console.log(resultArray)
      const cmds = resultArray.join('\n')
      // console.log(cmds)
      const response = String(result[2])
      try {
        
        await this.appService.executeCommands(resultString, resultArray);
        await this.service.savehistory(userId, data.name,data.location, data.prompt, response,cmds);
        return await this.service.getUserHistory(userId)

      } catch (error) {
        return `Error executing commands: ${error}`; 
      }
      // return this.service.getModelAnswer(data.name,data.location, data.prompt);

    }
    
}