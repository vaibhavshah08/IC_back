import { IsString } from "class-validator"

export class getAiModelAnswer{

    @IsString()
    name:string

    @IsString()
    location: string

    @IsString()
    prompt:string
}