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

export function getJwtSecret() {
  if (process.env.NODE_ENV === 'production') {
    fs.readFile('/run/secrets/jwt-secret', (err, data) => {
      if (err) {
        console.log(
          'ERROR: jwt-secret file must be available when run in production.'
        );
      } else {
        return data.toString();
      }
    });
  } else {
    return process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
  }
  return '';
}
