import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterRequest {

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(30, { message: 'Имя не должно превышать 30 символов' })
  name: string;

  @IsString({ message: 'Почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательна для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов' })
  @MaxLength(128, { message: 'Пароль должен быть не больше 128 символов' })
  password: string;
}