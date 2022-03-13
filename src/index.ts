import dotenv from 'dotenv';
import express from 'express';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { identityRepository } from './identity-repository';
import createJwt from './jwt';
import { generateSalt, hashPassword, validate } from './password';

dotenv.config();

interface IdentityInput {
  password: string;
  email: string;
  role: string;
}

const app = express();
app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
  const { password, email, role }: IdentityInput = req.body;
  const salt = await generateSalt();
  const hashedPassword = await hashPassword(password, salt, '');
  const newIdentity = {
    email,
    role,
    password: hashedPassword,
    salt
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
    const { password, salt } = user;
    if (await validate(req.body.password, password, salt)) {
      const { id, role, email } = user;
      const jwt = createJwt({ id, role, email });
      res.send({ jwt });
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(400);
  }
});

app.listen(4000);
