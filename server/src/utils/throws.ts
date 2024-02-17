import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExists() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}

export function passwordIsNotValid() {
  throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST);
}
