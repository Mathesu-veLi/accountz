import { hashSync } from 'bcryptjs';

export function generatePasswordHash(password: string): string {
  return hashSync(password, 10);
}
