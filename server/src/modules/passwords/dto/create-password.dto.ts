import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePasswordDto {
  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
