import jwt from 'jsonwebtoken';
import fs from 'fs';

interface PublicIdentity {
  id: string;
  role: string;
  email: string;
}

export function createJwt({ id, email, role }: PublicIdentity, secret: string) {
  const payload = {
    role,
    email
  };

  if (secret) {
    return jwt.sign(payload, secret, {
      subject: id,
      expiresIn: 60 * 60,
      issuer: 'https://auth.mutodo.jasont.dev/'
    });
  }
  return '';
}

export function getJwtSecret(): Promise<string> {
  // function should return undefined in the even that a secret cannot be
  // found in /run/secrets/jwt-secret (production) or JWT_SECRET in .env
  // (development and test)
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      fs.readFile('/run/secrets/jwt-secret', (err, data) => {
        if (err) {
          reject('Cannot locate JWT secret at /run/secrets/jwt-secret');
        } else {
          resolve(data.toString());
        }
      });
    } else {
      if (process.env.JWT_SECRET) {
        resolve(process.env.JWT_SECRET);
      } else {
        reject('Cannot locate secret in .env');
      }
    }
  });
}
