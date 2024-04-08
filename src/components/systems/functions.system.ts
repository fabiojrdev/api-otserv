import * as crypto from 'crypto';

// Crypto Text
export const hashPassword = (password: string): string => {
  return crypto.createHash('sha1').update(password).digest('hex');
};

// Generetion HASH
export const generateRandomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};
