import { Controller, Post, Get, Body, Res, Req } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        ){
    }

    @Get()
    async user(
        @Req() request: Request,
        @Res() response: Response 
        ){
        const token = request.headers.authorization;
        const cookie = request.cookies['jwt'];

        if(token || cookie){
            
            const userToken = token.split(" ")[1]; 

            try {
                const data = cookie ? await this.jwtService.verifyAsync(cookie) : await this.jwtService.verifyAsync(userToken);
    
                if(!data)
                    throw new UnauthorizedException();
        
                const users = await this.userService.findAll();
    
                users.map(function(element){
                    return delete element.password;
                });
              
                response.status(200).json({
                    message: 'User list retrieved successfully',
                    list: users
                });
                
            } catch (error) {
                throw new UnauthorizedException();
            }
        }
    }

    @Post('register')
    async register(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Res() response: Response 
    ){
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.userService.create({
            name,
            email,
            password: hashedPassword
        });

        delete user.password;

        response.status(200).json({
            message: 'Successfully registered user',
            list: user
        });
    }

    @Post('login')
    async login(        
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response 
        ) {
        const user = await this.userService.findOne({where: {email: email}});
          
        if(!user)
            throw new BadRequestException('Invalid credentials');

        if(!await bcrypt.compare(password, user.password))
            throw new BadRequestException('Invalid credentials');

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.status(200).json({
            message: 'User logged in successfully',
            token: jwt
        });
    }

}
