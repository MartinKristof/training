'use server';

import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function createUser(data: { name: string; email: string }) {
  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors.map(e => e.message).join(', ') };
  }
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { error: result.error || 'Failed to create user.' };
    }
    revalidateTag('users');
    return { success: 'User created successfully!', user: result.user };
  } catch {
    return { error: 'Network error.' };
  }
}
