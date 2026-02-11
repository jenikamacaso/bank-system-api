import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'secret123';

export const login = (req: Request, res: Response) => {
  const db = req.app.locals.db;

  if (!req.body) {
    return res.status(400).send('Body is missing');
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }

  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err: Error, user: any) => {
      if (err) return res.status(500).send('Database error');
      if (!user) return res.status(401).send('Invalid credentials');

      const token = jwt.sign({ username: user.username }, SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    },
  );
};
