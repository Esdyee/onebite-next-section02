# Next.js 오픈그래프(Open Graph) 설정 및 테스트 가이드

## 📋 목차
1. [오픈그래프란?](#오픈그래프란)
2. [Next.js에서 오픈그래프 설정](#nextjs에서-오픈그래프-설정)
3. [로컬 테스트 방법](#로컬-테스트-방법)
4. [실제 소셜미디어 테스트](#실제-소셜미디어-테스트)
5. [문제해결 가이드](#문제해결-가이드)

## 오픈그래프란?

오픈그래프(Open Graph)는 웹페이지가 소셜미디어에서 공유될 때 표시되는 메타데이터 프로토콜입니다.

### 주요 태그
- `og:title`: 공유 시 표시될 제목
- `og:description`: 공유 시 표시될 설명
- `og:image`: 공유 시 표시될 이미지
- `og:url`: 페이지의 정규 URL
- `og:type`: 콘텐츠 타입 (website, article 등)

## Next.js에서 오픈그래프 설정

### 1. 페이지별 설정 (현재 적용된 방법)

`src/pages/index.tsx`:
```tsx
import Head from "next/head";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>한입 북스</title>
        <meta name="description" content="ONEBITE BOOK" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
      {/* 페이지 컨텐츠 */}
    </>
  );
}
```

### 2. 글로벌 설정 (_document.tsx)

`src/pages/_document.tsx`:
```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* 기본 favicon */}
        <link rel="icon" href="/favicon.ico?v=2" />

        {/* 기본 오픈그래프 (모든 페이지에 적용) */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="한입 북스" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@your_twitter" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### 3. 동적 오픈그래프 (개별 도서 페이지)

`src/pages/book/[id].tsx`:
```tsx
import Head from "next/head";

export default function BookPage({ book }) {
  return (
    <>
      <Head>
        <title>{book.title} - 한입 북스</title>
        <meta name="description" content={book.description} />
        <meta property="og:title" content={book.title} />
        <meta property="og:description" content={book.description} />
        <meta property="og:image" content={book.coverImgUrl} />
        <meta property="og:url" content={`https://yoursite.com/book/${book.id}`} />
      </Head>
      {/* 페이지 컨텐츠 */}
    </>
  );
}
```

## 로컬 테스트 방법

### 방법 1: Node.js 스크립트 테스트 ⭐

프로젝트에 `test-og.js` 파일이 생성되어 있습니다.

```bash
# 서버가 실행 중인 상태에서
node test-og.js
```

**출력 예시:**
```
🔍 오픈그래프 태그 테스트

📄 페이지 정보:
Title: 한입 북스
Description: ONEBITE BOOK

📱 오픈그래프 정보:
OG Title: 한입 북스
OG Description: 한입 북스에 등록된 도서들을 만나보세요
OG Image: /thumbnail.png

✅ 모든 오픈그래프 태그가 올바르게 설정됨
```

### 방법 2: HTML 시각적 테스트

프로젝트에 `test-og.html` 파일이 생성되어 있습니다.

```bash
# 브라우저에서 파일 열기
open test-og.html
# 또는 브라우저에서 직접 파일 경로 입력
```

이 도구는 Facebook과 Twitter 스타일의 미리보기를 제공합니다.

### 방법 3: 브라우저 개발자 도구

1. `http://localhost:4000` 접속
2. F12로 개발자 도구 열기
3. Elements 탭에서 `<head>` 섹션 확인
4. `meta property="og:"` 검색하여 태그 확인

### 방법 4: curl 명령어

```bash
# 기본 확인
curl -s http://localhost:4000 | grep -E "(og:|title|description)"

# 더 상세한 확인
curl -s http://localhost:4000 | grep -E '<meta.*property="og:' -A1
```

### 방법 5: 브라우저 확장 프로그램

**Chrome 확장 프로그램:**
- **Open Graph Preview**: 현재 페이지의 OG 태그 미리보기
- **META SEO inspector**: 메타 태그 검증
- **Social Share Preview**: 소셜 미디어 공유 미리보기

## 실제 소셜미디어 테스트

로컬 환경은 외부에서 접근할 수 없으므로 공개 URL이 필요합니다.

### 방법 1: ngrok 사용 (추천) ⭐

```bash
# ngrok 설치 (Linux/WSL)
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# 또는 snap으로 설치
sudo snap install ngrok

# 계정 설정 (무료 계정 가입 필요)
ngrok authtoken YOUR_AUTH_TOKEN

# 사용법
ngrok http 4000
```

ngrok 실행 후:
```
Session Status                online
Account                      Your Account
Version                      3.x.x
Region                       United States (us)
Forwarding                   https://abc123.ngrok.io -> http://localhost:4000
```

### 방법 2: Vercel/Netlify 임시 배포

```bash
# Vercel 배포 (가장 간단)
npx vercel

# 또는 GitHub에 push 후 Vercel/Netlify 연결
```

### 소셜미디어별 테스트 도구

**제공된 공개 URL을 사용하여 테스트:**

1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - 공개 URL 입력하여 미리보기 확인

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Twitter 카드 형태로 미리보기 확인

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - LinkedIn 공유 시 미리보기 확인

4. **Open Graph Check**
   - URL: https://www.opengraph.xyz/
   - 범용 오픈그래프 검증 도구

## 문제해결 가이드

### 문제 1: 이미지가 표시되지 않음

**원인:**
- 상대 경로 사용 (`/thumbnail.png`)
- 이미지 파일 접근 불가

**해결:**
```tsx
// ❌ 로컬에서만 작동
<meta property="og:image" content="/thumbnail.png" />

// ✅ 절대 URL 사용
<meta property="og:image" content="https://yoursite.com/thumbnail.png" />

// ✅ 동적 URL 생성
<meta property="og:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/thumbnail.png`} />
```

### 문제 2: 태그가 업데이트되지 않음

**원인:** 소셜미디어 플랫폼의 캐싱

**해결:**
1. Facebook Sharing Debugger에서 "Scrape Again" 클릭
2. 이미지 URL에 버전 파라미터 추가: `?v=2`
3. 캐시 무효화를 위해 URL 파라미터 변경

### 문제 3: 로컬 테스트 시 CORS 오류

**원인:** 브라우저의 CORS 정책

**해결:**
```bash
# Chrome을 CORS 비활성화로 실행
google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"

# 또는 Firefox 사용
# 또는 ngrok 사용하여 공개 URL 생성
```

### 문제 4: 이미지 크기 최적화

**권장 사항:**
- **Facebook**: 1200x630px (1.91:1 비율)
- **Twitter**: 1200x600px (2:1 비율)
- **LinkedIn**: 1200x627px
- **파일 크기**: 8MB 미만, 최적화된 경우 100KB 미만

## 고급 설정

### 1. 다국어 지원

```tsx
<Head>
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:locale:alternate" content="en_US" />
</Head>
```

### 2. 다양한 이미지 크기 제공

```tsx
<Head>
  <meta property="og:image" content="/og-image-1200x630.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="한입 북스 도서 목록" />
</Head>
```

### 3. Twitter 카드 세부 설정

```tsx
<Head>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@onebite_books" />
  <meta name="twitter:creator" content="@author_name" />
  <meta name="twitter:title" content="한입 북스" />
  <meta name="twitter:description" content="한입 북스에 등록된 도서들을 만나보세요" />
  <meta name="twitter:image" content="/thumbnail.png" />
</Head>
```

## 체크리스트

테스트 전 확인사항:

- [ ] `public/thumbnail.png` 파일이 존재하는가?
- [ ] 이미지 크기가 적절한가? (1200x630px 권장)
- [ ] 모든 필수 og 태그가 설정되었는가? (title, description, image)
- [ ] 로컬 서버가 4000 포트에서 실행 중인가?
- [ ] 절대 URL을 사용하고 있는가? (배포 시)

## 테스트 순서

1. **로컬 테스트**: `node test-og.js` 실행
2. **시각적 확인**: `test-og.html` 파일로 미리보기
3. **브라우저 확인**: F12로 실제 렌더링된 태그 검증
4. **공개 테스트**: ngrok으로 공개 URL 생성
5. **소셜미디어 검증**: Facebook/Twitter/LinkedIn 도구로 최종 확인

이 가이드를 따라 단계적으로 테스트하시면 완벽한 오픈그래프 설정을 구현할 수 있습니다!