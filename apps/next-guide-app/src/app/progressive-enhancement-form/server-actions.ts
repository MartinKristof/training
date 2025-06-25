'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '../../lib/prisma';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function createUserAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const parsed = userSchema.safeParse({ name, email });
  if (!parsed.success) {
    const error = encodeURIComponent(JSON.stringify(parsed.error.flatten().fieldErrors));
    return redirect(
      `/progressive-enhancement-form?error=${error}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    );
  }
  try {
    await prisma.user.create({
      data: { name, email },
    });
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'code' in err &&
      (err as { code?: string }).code === 'P2002' &&
      'meta' in err &&
      Array.isArray((err as { meta?: { target?: string[] } }).meta?.target) &&
      ((err as { meta?: { target?: string[] } }).meta?.target as string[]).includes('email')
    ) {
      const error = encodeURIComponent(JSON.stringify({ email: 'This email is already registered.' }));
      return redirect(
        `/progressive-enhancement-form?error=${error}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
      );
    }
    // fallback error
    const error = encodeURIComponent(JSON.stringify({ email: 'An unexpected error occurred.' }));
    return redirect(
      `/progressive-enhancement-form?error=${error}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
    );
  }
  return redirect(`/progressive-enhancement-form?success=${encodeURIComponent('User created successfully!')}`);
}
