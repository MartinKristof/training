'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function createUser(data: { name: string; email: string }) {
  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    // Return field errors for the client
    const fieldErrors: Record<string, string> = {};
    parsed.error.errors.forEach(e => {
      if (e.path[0]) fieldErrors[e.path[0]] = e.message;
    });
    return { fieldErrors, error: 'Please fix the errors below.' };
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    });
    revalidatePath('/database-demo');
    return { success: 'User created successfully!', user };
  } catch (error) {
    if (error instanceof Error && typeof error.message === 'string' && error.message.includes('Unique constraint')) {
      return { fieldErrors: { email: 'Email already exists.' }, error: 'Please fix the errors below.' };
    }
    return { error: 'Failed to create user.' };
  }
}
