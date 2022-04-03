import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import { identityRepository } from './identity-repository';
import { createJwt } from './jwt';
import { generateSalt, hashPassword, validate } from './password';

interface IdentityInput {
  password: string;
  email: string;
  role: string;
}

export default async function app(
  port: number,
  databaseUrl: string,
  jwtSecret: string
) {
  global.jwtSecret = jwtSecret;
  global.databaseUrl = databaseUrl;
  try {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.post('/auth/register', async (req: Request, res: Response) => {
      if (!req.body.password || !req.body.email || !req.body.role) {
        res.sendStatus(400);
      } else {
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
      }
    });

    app.post('/auth/login', async (req: Request, res: Response) => {
      // validate request body
      if (!req.body.email || !req.body.password) {
        res.sendStatus(400);
      } else {
        const user = await identityRepository.findByEmail(req.body.email);
        if (user != null) {
          const { password } = user;
          if (await validate(req.body.password, password)) {
            if (global.jwtSecret) {
              const { id, role, email } = user;
              const jwt = createJwt({ id, role, email }, global.jwtSecret);
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
      }
    });
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
}
