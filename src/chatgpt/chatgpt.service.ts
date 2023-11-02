import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { cmdentity } from './command.entity';
require('dotenv').config({

  path: `./.env`

})


@Injectable()
export class ChatGPTService {
  private readonly openAiAPi: OpenAIApi
  private readonly JWT_SECRET = 'helloiamvaibhavshah08'
  constructor( 
    @InjectRepository(cmdentity) private cmdentityRepository: Repository<cmdentity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>)
  {
    const configuration = new Configuration({
      // organization: 'your-orgnizarion-id',
      apiKey: 'your-api-key',
  });
  this.openAiAPi = new OpenAIApi(configuration);
  }
  

  async savehistory(id:number,name:string,location: string, prompt: string, response:string,commands:string): Promise<cmdentity>{
    const user = await this.userRepository.findOne({where: {id} });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cd = new Date();
    const india = { timeZone: 'Asia/kolkata' };
    const fd = cd.toLocaleString('en-US',india)
    const historyEntry = new cmdentity();
    historyEntry.project_name = name;
    historyEntry.prompt = `${prompt} with name ${name}`;
    historyEntry.location = location;
    historyEntry.response = response;
    historyEntry.commands = commands;
    historyEntry.timestamp = fd;
    historyEntry.userId = user.id;
    return await this.cmdentityRepository.save(historyEntry);
  }

  async getUserHistory(id: number): Promise<cmdentity[]> {
    const queryBuilder = this.cmdentityRepository
    .createQueryBuilder('history')
    .select(['history.projectid','history.project_name','history.prompt', 'history.location', 'history.response','history.commands', 'history.timestamp','history.userId'])
    .where('history.userId = :id', { id })
    .orderBy('history.timestamp', 'DESC'); // Optionally, you can order by timestamp in descending order

  return queryBuilder.getMany();
  }

  async getModelAnswer(name:string,location:string, question:string){
    try{
        const params: CreateCompletionRequest={
            prompt:`I want you to act as a helpful command line assistant for questions related to command line commands. In this scenario, you will be presented with questions about various command line tasks, and you should provide both a brief information snippet about the question and a set of commands in the form of an array to accomplish the task. Here's an example format for your response:
            **Question:** "Create a Nest JS application with the name "my_nest_app"."            
            **Answer:** Nest. JS is a framework for building efficient and scalable server-side applications using JavaScript or TypeScript. It is built on top of the widely popular Node. js runtime and leverages its asynchronous, event-driven nature to provide a robust and reliable platform for developing web applications. To create a Nest JS application named 'my_nest_app', you can follow these steps:            
            1. Install Nest CLI:
            bash
            npm install -g @nestjs/cli            
            2. Create the application:
            bash
            nest new my_nest_app            
            3. Move into the app directory:
            bash
            cd my_nest_app       
            **Commands:**
            json
            $[
              "npm install -g @nestjs/cli",
              "nest new my_nest_app",
              "cd my_nest_app"
            ]$  
            To start the server, use the command:
            npm run start
            So the question for you is: ${question} with name ${name}"`,
            model: "text-davinci-003",
            temperature: 0.9,
            max_tokens:2048
        } 

        const response = await this.openAiAPi.createCompletion(params)

        const array = response.data["choices"][0]["text"]
        const commandPattern = /\$\[([\s\S]*?)\]\$/g;
        const commandArray: string[] = [];

        let match;
        while ((match = commandPattern.exec(array)) !== null) {
          const commands = match[1].split('\n')
            .map(command => command.trim())
            .filter(command => command !== '')
            .map(command => {
              const matchQuotes = command.match(/"([^"]+)"/);
              return matchQuotes ? matchQuotes[1] : '';
            })
            .filter(command => command !== '');

          commandArray.push(...commands);
        }
        return [location,commandArray,array]
    } catch (error) {
    }
  }
}
