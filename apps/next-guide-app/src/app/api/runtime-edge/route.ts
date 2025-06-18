import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json({
    runtime: 'edge',
    message: 'This API route runs on the Edge runtime.',
  });
}
