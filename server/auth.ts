import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to authenticate JWT token
function authenticateToken(req: express.Request & { user?: any }, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Create properly hashed password for demo123
const demoPasswordHash = bcrypt.hashSync('demo123', 10);

// Mock user database - in production, this would be from MongoDB/PostgreSQL
const users = [
  {
    id: '1',
    email: 'demo@globallogic.com',
    password: demoPasswordHash,
    name: 'John Smith',
    role: 'Software Engineer',
    department: 'Engineering',
    startDate: '2024-01-15',
    profileCompleted: true,
  },
  {
    id: '2',
    email: 'jane.doe@globallogic.com',
    password: demoPasswordHash,
    name: 'Jane Doe',
    role: 'Product Manager',
    department: 'Product',
    startDate: '2024-01-20',
    profileCompleted: false,
  }
];

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user endpoint
router.get('/me', authenticateToken, (req: any, res: Response) => {
  const user = users.find(u => u.id === req.user?.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

export { router as authRouter, authenticateToken };
