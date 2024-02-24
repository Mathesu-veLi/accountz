import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  websiteUrl: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
