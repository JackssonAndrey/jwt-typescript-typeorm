import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Users from '../models/Users';

interface SecretKey {
  key: string | Buffer;
  passphrase: string;
}

class LoginController {
  async index(req: Request, res: Response) {
    const { email, password } = req.body;
    const repository = getRepository(Users);
    const secretKey = process.env.SERCRET_KEY;

    const user = await repository.findOne({ where: { email } });
    if (!user) return res.sendStatus(401);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.sendStatus(401);

    const token = jwt.sign({ id: user.id }, secretKey as unknown as SecretKey, { expiresIn: '1d' });

    return res.json({ user: { id: user.id, email: user.email, created_at: user.created_at }, token });
  }
}

export default new LoginController();