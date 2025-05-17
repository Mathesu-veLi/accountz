import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { PrismaService } from '../../prisma/prisma.module';
import { sign } from 'jsonwebtoken';
import { passwordIsNotValid, userNotExists } from '../../utils/throws';
import { passwordIsValid } from '../../utils/userPasswordUtils';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {}

  async create(createTokenDto: CreateTokenDto) {
    const user = await this.prismaService.users.findUnique({
      where: { email: createTokenDto.email },
    });
    if (!user) return userNotExists();

    if (!passwordIsValid(createTokenDto.password, user.password))
      return passwordIsNotValid();

    function getEnvOrThrow(name: string): string {
      const value = process.env[name];
      if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
      }
      return value;
    }

    const token = sign(
      { id: user.id, email: user.email },
      getEnvOrThrow('TOKEN_SECRET'),
      {
        expiresIn: getEnvOrThrow(
          'TOKEN_EXPIRATION',
        ) as `${number}${'s' | 'm' | 'h' | 'd'}`,
      },
    );

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  }
}
