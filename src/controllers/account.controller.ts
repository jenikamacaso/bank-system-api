import { Request, Response } from 'express';
import db from '../config/db';

export const createAccount = (req: Request, res: Response) => {
  const { accountNumber, customerName, accountType, accountStatus } = req.body;
  const dateCreated = new Date().toISOString();

  db.run(
    `INSERT INTO accounts VALUES (?,?,?,?,?)`,
    [accountNumber, customerName, accountType, accountStatus, dateCreated],
    (err) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({
            message: 'Account number already exists',
          });
        }
        return res.status(500).json({ message: 'Something went wrong.' });
      }

      res.json({ message: 'Account Created' });
    },
  );
};

export const getAccountById = (req: Request, res: Response) => {
  const { id } = req.params;

  db.get('SELECT * FROM accounts WHERE accountNumber = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  });
};

export const updateAccount = (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerName, accountType, accountStatus } = req.body;

  db.run(
    `UPDATE accounts 
     SET customerName=?, accountType=?, accountStatus=? 
     WHERE accountNumber=?`,
    [customerName, accountType, accountStatus, id],
    function (err) {
      if (err) return res.status(500).json({ message: err.message });

      res.json({ message: 'Account updated' });
    },
  );
};

export const getAccounts = (_: Request, res: Response) => {
  db.all(`SELECT * FROM accounts`, (err, rows) => {
    res.json(rows);
  });
};

export const deleteAccount = (req: Request, res: Response) => {
  db.run(`DELETE FROM accounts WHERE accountNumber=?`, [req.params.id], () =>
    res.json({ message: 'Account deleted' }),
  );
};
