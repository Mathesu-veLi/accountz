import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
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
export class AccountsService {
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

  create(createAccountDto: CreateAccountDto) {
    return this.prismaService.accounts
      .create({
        data: {
          ...createAccountDto,
          password: JSON.stringify(encrypt(createAccountDto.password)),
          userId: this.userId,
        },
      })
      .catch((e) => {
        if (e.code === 'P2002') accountAlreadyRegistered();
      });
  }

  findAll() {
    return this.prismaService.accounts.findMany();
  }

  async findOne(id: number) {
    const account = await this.prismaService.accounts
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

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.prismaService.accounts.update({
      where: { id },
      data: {
        ...updateAccountDto,
        password: JSON.stringify(encrypt(updateAccountDto.password)),
      },
    });
  }

  remove(id: number) {
    return this.prismaService.accounts.delete({
      where: { id },
    });
  }
}
