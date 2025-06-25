import type { NextApiRequest, NextApiResponse } from 'next';
import { users, User } from '@/lib/data';

export default function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
  res.status(200).json(users);
}
