import { NextRequest, NextResponse } from 'next/server';
import { makeProxyRequest } from '@/lib/proxyHelper';

export async function POST(request: NextRequest) {
  try {
    const { endpoint, method, data } = await request.json();

    const result = await makeProxyRequest({
      endpoint,
      method: method || 'GET',
      data,
    });

    if (result.status && result.status >= 400) {
      return NextResponse.json(
        { error: `HTTP error! status: ${result.status}` },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
