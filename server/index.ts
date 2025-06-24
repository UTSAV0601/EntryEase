import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { authRouter } from './auth'; // ✅ fixed here

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter); // ✅ fixed here

app.use(express.static(path.join(__dirname, '../dist/client')));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'GlobalLogic Onboarding Portal API is running' });
});

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
});

export default app;
