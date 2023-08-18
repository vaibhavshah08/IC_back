import { Expose } from 'class-transformer';

export class Userdto { 
    @Expose()
    id: number; 

    @Expose()
    email: string; 

    @Expose()
    access_token:string
}