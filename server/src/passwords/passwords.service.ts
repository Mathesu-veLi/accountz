import { Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PasswordsService {
  constructor(private prismaService: PrismaService) {}

  create(createPasswordDto: CreatePasswordDto) {
    return this.prismaService.passwords.create({
      data: createPasswordDto,
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
