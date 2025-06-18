'use server';

import { cookies } from 'next/headers';

export async function setAuthToken() {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', 'demo-token', {
    path: '/',
    maxAge: 3600,
    sameSite: 'lax',
  });
}

export async function clearAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
