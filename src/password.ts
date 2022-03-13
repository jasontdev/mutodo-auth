import bcrypt from 'bcrypt';

export function hashPassword(
  rawPassword: string,
  salt: string,
  secret: string
): Promise<string> {
  return bcrypt.hash(rawPassword, salt);
}

export function generateSalt(): Promise<string> {
  let saltRounds = 10;
  if (process.env.SALT_ROUNDS) {
    saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  }

  return bcrypt.genSalt(saltRounds);
}

export async function validate(
  rawPassword: string,
  hashedPassword: string,
  salt: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    hashPassword(rawPassword, salt, '')
      .then((result: string) => {
        resolve(result === hashedPassword);
      })
      .catch(() => reject());
  });
}
