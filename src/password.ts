import bcrypt from 'bcrypt';

export function hashPassword(
  rawPassword: string,
  salt: string
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
  hashedPassword: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(rawPassword, hashedPassword, (err, result) => {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}
