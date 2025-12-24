// app/api/chat/route.ts - GLM Chat Completion Proxy
// 무료 Groq API 사용 (Llama 3.3 70B)

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, temperature, max_tokens } = body;

    // Groq API (무료, 매우 빠름)
    // https://groq.com
    const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_';

    if (!GROQ_API_KEY || GROQ_API_KEY === 'gsk_') {
      return NextResponse.json(
        { error: 'Groq API 키가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // Groq API 호출 (Llama 3.3 70B - 무료)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // 또는 'mixtral-8x7b-32768'
        messages: messages || [],
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 4096
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || 'API 호출 실패' },
        { status: 400 }
      );
    }

    // CORS 헤더 추가
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// OPTIONS 메서드 지원 (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
