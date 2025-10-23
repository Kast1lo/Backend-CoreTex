import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { register } from 'module';
import { PrismaDatabaseService } from 'src/prisma-database/prisma-database.service';
import { RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequest } from './dto/login.dto';

@Injectable()
export class AuthService {

    private readonly JWT_SECRET: string;
    private readonly JWT_ACCESS_TOKEN_TTL: string;
    private readonly JWT_REFRESH_TOKEN_TTL: string;

    constructor(
        private readonly prismaService: PrismaDatabaseService, 
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){
        this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
        this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
        this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');

    }

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
                password: await hash(password),
            }
        });

        return this.generateTokens(user.id);
    }

    async login(dto: LoginRequest) {
        const {email, password} = dto;

        const user = await this.prismaService.user.findUnique({
            where:{
                email
            },
            select: {
                id: true,
                password: true,
            }
        });
        if (!user){
            throw new NotFoundException('Пользователь не найден')
        }
    }

    private generateTokens(id: string){
        const payload: JwtPayload = {id};

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_ACCESS_TOKEN_TTL as any,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.JWT_REFRESH_TOKEN_TTL as any,
        });

        return {
            accessToken , refreshToken
        }
    };
}
