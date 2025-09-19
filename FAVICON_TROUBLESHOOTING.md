# Next.js Favicon 교체 문제 해결 가이드

## 문제 상황
Next.js 프로젝트에서 `/public/favicon.ico` 파일을 교체했음에도 불구하고 브라우저에서 새로운 favicon이 표시되지 않는 문제

## 원인 분석

### 1. 브라우저의 강력한 Favicon 캐싱
- Favicon은 브라우저가 특별하게 관리하는 리소스
- 일반적인 캐시 클리어 방법으로는 삭제되지 않음
- Chrome/Edge는 별도의 Favicon 데이터베이스를 유지

### 2. 캐싱 계층
1. **브라우저 캐시**: 일반 리소스 캐시
2. **Favicon 데이터베이스**: 브라우저별 특수 캐시
3. **DNS 캐싱**: 도메인별 favicon 캐싱
4. **Next.js 빌드 캐시**: Production 빌드 캐싱

## 해결 방법

### 1. 캐시 버스팅 (Cache Busting) - 가장 효과적 ✅

`/src/pages/_document.tsx` 파일 수정:

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**핵심**: `?v=2` 쿼리 파라미터를 추가하여 브라우저가 새 파일로 인식하도록 함

### 2. 빌드 및 서버 재시작

```bash
# 1. 프로젝트 재빌드
npm run build

# 2. 서버 재시작
npm run start
```

### 3. 브라우저 캐시 완전 제거

#### 방법 1: 강제 새로고침
- Windows/Linux: `Ctrl + F5`
- Mac: `Cmd + Shift + R`

#### 방법 2: 개발자 도구 활용
1. F12로 개발자 도구 열기
2. Network 탭 선택
3. "Disable cache" 체크박스 활성화
4. 페이지 새로고침

#### 방법 3: 직접 접근 확인
- 브라우저에서 `http://localhost:4000/favicon.ico` 직접 접속
- 새 아이콘이 표시되는지 확인

#### 방법 4: 시크릿 모드
- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`
- 캐시 없는 상태에서 테스트

### 4. Chrome Favicon 캐시 완전 삭제 (최후의 방법)

#### Windows
1. Chrome 완전 종료
2. `%LocalAppData%\Google\Chrome\User Data\Default` 폴더 열기
3. `Favicons` 파일 삭제

#### Linux/WSL
1. Chrome 완전 종료
2. `~/.config/google-chrome/Default/` 폴더로 이동
3. `Favicons` 파일 삭제

#### Mac
1. Chrome 완전 종료
2. `~/Library/Application Support/Google/Chrome/Default` 폴더로 이동
3. `Favicons` 파일 삭제

## 파일 구조 확인사항

```
section02/
├── public/
│   └── favicon.ico  ← 새 favicon 파일 위치
├── src/
│   └── pages/
│       └── _document.tsx  ← favicon 링크 설정
└── .next/  ← 빌드 출력 (재빌드 필요)
```

## 트러블슈팅 체크리스트

- [ ] `/public/favicon.ico` 파일이 올바른 위치에 있는가?
- [ ] `_document.tsx`에 favicon 링크가 추가되었는가?
- [ ] 쿼리 파라미터(`?v=2`)를 추가했는가?
- [ ] 프로젝트를 재빌드했는가? (`npm run build`)
- [ ] 서버를 재시작했는가?
- [ ] 브라우저 캐시를 제거했는가?
- [ ] 시크릿 모드에서 테스트해봤는가?
- [ ] 직접 URL로 favicon에 접근 가능한가?

## 포트 충돌 해결

서버 시작 시 포트 충돌 발생하는 경우:

```bash
# 포트 4000 사용 중인 프로세스 확인
ss -tlnp | grep :4000

# 포트 4000 강제 종료
sudo fuser -k 4000/tcp

# 또는 PID로 직접 종료
sudo kill -9 [PID]
```

## 주의사항

1. **favicon.ico는 특수 파일**: 브라우저가 자동으로 `/favicon.ico`를 요청
2. **캐싱 기간**: Favicon은 최대 몇 주까지 캐싱될 수 있음
3. **버전 관리**: 쿼리 파라미터의 버전 번호를 증가시켜 관리 (`v=3`, `v=4`, ...)
4. **다양한 형식 지원**: `.ico` 외에 `.png`, `.svg` 형식도 사용 가능

## 추가 팁

### 여러 크기의 Favicon 제공
```tsx
<Head>
  <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</Head>
```

### 동적 Favicon (다크 모드 대응)
```tsx
<link
  rel="icon"
  href="/favicon-light.ico"
  media="(prefers-color-scheme: light)"
/>
<link
  rel="icon"
  href="/favicon-dark.ico"
  media="(prefers-color-scheme: dark)"
/>
```

## 결론

Favicon 교체 시 가장 중요한 것은 **캐시 버스팅**입니다. 쿼리 파라미터를 추가하는 간단한 방법으로 대부분의 문제를 해결할 수 있습니다. 그래도 해결되지 않는다면 브라우저의 Favicon 데이터베이스를 직접 삭제하는 방법을 시도해보세요.