import type { NextApiRequest, NextApiResponse } from 'next';
import { users, User } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse<User | { message: string }>) {
  const { id } = req.query;
  const user = users.find(user => user.id === parseInt(id as string, 10));

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}
