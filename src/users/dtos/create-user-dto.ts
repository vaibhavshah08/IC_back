import{IsEmail , IsNotEmpty} from 'class-validator';

export class CreateUserdto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}