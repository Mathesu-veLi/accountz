import * as crypto from 'node:crypto';

const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = process.env.ENCRYPTION_KEY.repeat(2);

export function encrypt(password: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export function decrypt(encryptedPassword) {
  const iv = Buffer.from(encryptedPassword.iv, 'hex');
  const encryptedText = Buffer.from(encryptedPassword.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
