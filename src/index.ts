import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import { identityRepository } from './identity-repository';
import { createJwt, getJwtSecret } from './jwt';
import { generateSalt, hashPassword, validate } from './password';

interface IdentityInput {
  password: string;
  email: string;
  role: string;
}

console.log('Starting mutado/auth');

dotenv.config();
const jwtSecret = getJwtSecret();

const app = express();
app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
  const { password, email, role }: IdentityInput = req.body;
  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt);
  const newIdentity = {
    email,
    role,
    password: hashedPassword
  };

  try {
    const savedUser = await identityRepository.save(newIdentity);
    res.status(200).send(savedUser);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.post('/login', async (req: Request, res: Response) => {
  const user = await identityRepository.findByEmail(req.body.email);
  if (user != null) {
    const { password } = user;
    if (await validate(req.body.password, password)) {
      // jwtSecret will be undefined if a secret was provided through
      // /run/secrets/jwt-secret or JWT_SECRET in .env
      if (jwtSecret) {
        const { id, role, email } = user;
        const jwt = createJwt({ id, role, email }, jwtSecret);
        res.send({ jwt });
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

app.listen(4000);
