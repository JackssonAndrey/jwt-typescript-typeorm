import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Users from '../models/Users';

class UsersController {
  async store(req: Request, res: Response) {
    const repository = getRepository(Users);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });
    if (userExists) return res.sendStatus(409);

    const user = repository.create({ email, password });
    await repository.save(user);

    return res.json(user);
  }

  async details(req: Request, res: Response) {
    const id = req.userId;
    const repository = getRepository(Users);

    const user = await repository.findOne({ where: { id } });

    return res.json({ user: { id: user?.id, email: user?.email, created_at: user?.created_at } });
  }
}

export default new UsersController();