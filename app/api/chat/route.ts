// app/api/chat/route.ts - GLM Chat Completion Proxy

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, messages, temperature, max_tokens } = body;

    // 환경 변수에서 API 키 가져오기
    const API_KEY = process.env.GLM_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다. 서버 관리자에게 문의하세요.' },
        { status: 500 }
      );
    }

    // Z.ai GLM API 호출
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: model || 'glm-4.7',
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
