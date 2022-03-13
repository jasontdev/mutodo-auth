import jwt from 'jsonwebtoken';

interface PublicIdentity {
  id: string;
  role: string;
  email: string;
}

export default function createJwt({ id, email, role }: PublicIdentity) {
  const secret = process.env.JWT_SECRET;
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
