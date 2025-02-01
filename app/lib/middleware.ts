import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const verifyToken = (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token is required' });
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Pastikan 'JWT_SECRET' di .env
    return decoded;
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
};
