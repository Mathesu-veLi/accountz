import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';
import { accountAlreadyRegistered, accountNotExists } from 'src/utils/throws';
import { decrypt, encrypt } from 'src/utils/savedPasswordsUtils';

interface ITokenDecoded {
  id: number;
  email: string;
}

@Injectable({ scope: Scope.REQUEST })
export class PasswordsService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private prismaService: PrismaService,
  ) {}

  private get userId() {
    const { authorization } = this.request.headers;
    const [, token] = authorization.split(' ');
    const decoded = decode(token) as ITokenDecoded;
    return decoded.id;
  }

  create(createPasswordDto: CreatePasswordDto) {
    return this.prismaService.passwords
      .create({
        data: {
          ...createPasswordDto,
          password: JSON.stringify(encrypt(createPasswordDto.password)),
          userId: this.userId,
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') accountAlreadyRegistered();
      });
  }

  findAll() {
    return this.prismaService.passwords.findMany();
  }

  async findOne(id: number) {
    const account = await this.prismaService.passwords
      .findUniqueOrThrow({
        where: { id },
      })
      .then((account) => {
        const encryptedPassword = JSON.parse(account.password);
        const decryptedPassword = decrypt(encryptedPassword);
        account.password = decryptedPassword;
        return account;
      })
      .catch(() => accountNotExists());

    return account;
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return this.prismaService.passwords.update({
      where: { id },
      data: {
        ...updatePasswordDto,
        password: JSON.stringify(encrypt(updatePasswordDto.password)),
      },
    });
  }

  remove(id: number) {
    return this.prismaService.passwords.delete({
      where: { id },
    });
  }
}
