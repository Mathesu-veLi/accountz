import { Inject, Injectable, Scope } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';
import { accountAlreadyRegistered } from 'src/utils/throws';

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
    //TODO: encrypt password
    return this.prismaService.passwords
      .create({
        data: { ...createPasswordDto, userId: this.userId },
      })
      .catch((e) => {
        if (e.code === 'P2002') accountAlreadyRegistered();
      });
  }

  findAll() {
    return this.prismaService.passwords.findMany();
  }

  findOne(id: number) {
    return this.prismaService.passwords.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return this.prismaService.passwords.update({
      where: { id },
      data: updatePasswordDto,
    });
  }

  remove(id: number) {
    return this.prismaService.passwords.delete({
      where: { id },
    });
  }
}
