import fs from 'fs';

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

export async function getDatabaseUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'production') {
      fs.readFile('/run/secrets/database-url', (err, data) => {
        if (err) {
          reject('Cannot locate JWT secret at /run/secrets/database-url');
        } else {
          resolve(data.toString());
        }
      });
    } else {
      if (process.env.DATABASE_URL) {
        resolve(process.env.DATABASE_URL);
      } else {
        reject();
      }
    }
  });
}
