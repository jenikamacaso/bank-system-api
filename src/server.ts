import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import db from './config/db';
import authRoutes from './routes/auth.routes';
import accountRoutes from './routes/account.routes';

const app = express();
const PORT = 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Make db accessible in routes via request.app.locals
app.use((req: Request, res: Response, next: NextFunction) => {
  req.app.locals.db = db;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
