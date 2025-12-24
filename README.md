# GLM API Proxy Server (Next.js)

Chrome 확장 프로그램을 위한 GLM API 프록시 서버입니다.

## 🚀 Vercel에 배포하기

### 방법 1: GitHub + Vercel (권장)

1. **GitHub에 프로젝트 푸시**
   ```bash
   cd C:/projects/glm-proxy-next
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/glm-proxy-next.git
   git push -u origin main
   ```

2. **Vercel에서 배포**
   - https://vercel.com 접속
   - **Add New** → **Project**
   - **Import Git Repository**에서 `glm-proxy-next` 선택
   - **Environment Variables** 추가:
     * Key: `GLM_API_KEY`
     * Value: `c7020a6ccf7746d5b93c460a8190a807.ZBLFgBl5O8nIgsPd`
   - **Deploy** 클릭

### 방법 2: Vercel CLI

```bash
cd C:/projects/glm-proxy-next
vercel login
vercel
```

## 📡 API 엔드포인트

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/chat` | POST | Chat Completions |

## 📝 사용 예시

```javascript
const response = await fetch('https://your-project.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'glm-4.7',
    messages: [{ role: 'user', content: '안녕하세요!' }]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
```

## 🔑 환경 변수

| 변수 | 설명 |
|------|------|
| `GLM_API_KEY` | Z.ai API Key |

## 📁 프로젝트 구조

```
glm-proxy-next/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts    # Chat Completions API
├── .env.local.example
├── vercel.json
├── package.json
└── README.md
```

## 🛡️ 보안

- API 키는 서버 환경 변수에 저장되어 클라이언트에 노출되지 않습니다
- CORS 헤더가 설정되어 Chrome 확장 프로그램에서 호출할 수 있습니다
