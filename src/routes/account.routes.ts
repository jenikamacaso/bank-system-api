import { Router } from 'express';
import {
  createAccount,
  getAccounts,
  deleteAccount,
  getAccountById,
  updateAccount,
} from '../controllers/account.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createAccount);
router.get('/', authenticate, getAccounts);
router.get('/:id', getAccountById);
router.put('/:id', updateAccount);
router.delete('/:id', authenticate, deleteAccount);

export default router;
