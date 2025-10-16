import { ConflictException, Injectable } from '@nestjs/common';
import { register } from 'module';
import { PrismaDatabaseService } from 'src/prisma-database/prisma-database.service';
import { RegisterRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaDatabaseService){}

    async register(dto: RegisterRequest){
        const {name, email, password} = dto;


        const existUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (existUser){
            throw new ConflictException('Пользователь с такой почтой уже существует')
        }

        const user = await this.prismaService.user.create({
            data:{
                name,
                email,
                password,
            }
        });

        return user;
    }
}
