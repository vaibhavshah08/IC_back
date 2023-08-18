import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import * as jwt from 'jsonwebtoken'; // Import the JWT library
import { UserEntity } from "./user.entity";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

const scrypt = promisify(_scrypt);
const JWT_SECRET = 'helloiamvaibhavshah08'; // Replace with your own secret key

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) {}

    async signup(email: string, password: string): Promise<UserEntity> {
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in Use');
        }
        
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create(email, result);

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('Error not Found!!!!');
        }

        const [salt, Shash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer; 

        if (Shash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong Password');
        }

        // Generating JWT token with user ID
        const payload = { id: user.id, email: user.email };
        const access_token= await this.jwtService.signAsync(payload)
    return {
        id:user.id,
        access_token: access_token,
    }
    }
    async verifyToken(token: string): Promise<{ id: number }> {
        const decoded = await this.jwtService.verify(token, { secret: JWT_SECRET }); 
        return { id: decoded.sub };
    }
}
