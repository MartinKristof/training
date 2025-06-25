import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    runtime: 'nodejs',
    message: 'This API route runs on the default Node.js runtime.',
  });
}
