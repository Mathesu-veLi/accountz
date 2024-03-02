import { HttpException, HttpStatus } from '@nestjs/common';

export function userNotExists() {
  throw new HttpException('User not found', HttpStatus.NOT_FOUND);
}

export function userAlreadyExist() {
  throw new HttpException('User already exists', HttpStatus.CONFLICT);
}

export function passwordIsNotValid() {
  throw new HttpException('Password is not valid', HttpStatus.BAD_REQUEST);
}

export function accountAlreadyRegistered() {
  throw new HttpException('Account already registered', HttpStatus.CONFLICT);
}

export function accountNotExists() {
  throw new HttpException('Account not exists', HttpStatus.NOT_FOUND);
}
