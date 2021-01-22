import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

interface SecretKey {
  key: string | Buffer;
  passphrase: string;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.sendStatus(401);
  const secretKey = process.env.SERCRET_KEY;

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, secretKey as unknown as SecretKey);

    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
