import { Body, Controller, Post, Get , Param, Delete,Patch, Query, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { CreateUserdto } from './dtos/create-user-dto';
import { UsersService } from './user.service';
import { serialize } from '../interceptors/serialize.interceptor';
import { Userdto } from './dtos/user.dto';
import { AuthService } from './authservice';
import { UserEntity } from './user.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller()
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
        ) {}


    

}
