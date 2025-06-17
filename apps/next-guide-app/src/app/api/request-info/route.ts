import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get all headers from the request
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return NextResponse.json({
    url: request.url,
    method: request.method,
    timestamp: new Date().toISOString(),
    headers,
  });
}
