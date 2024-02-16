import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { generatePasswordHash } from '../utils/passwordUtils';
import { userNotExists } from 'src/errors/userNotExists';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const passwordHash = generatePasswordHash(createUserDto.password);

    return this.prismaService.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwordHash,
      },
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.users
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.prismaService.users
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.users
      .findUniqueOrThrow({
        where: { id },
      })
      .catch(() => userNotExists());

    return this.prismaService.users.delete({ where: { id } });
  }
}
