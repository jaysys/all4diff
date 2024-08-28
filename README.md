# 리액트 렌더링 4가지 방식 비교해보기

```
npm run dev
```

## case.1 csr/ssr/isr/ssg

http://localhost:3000/pages/all4

## case.2 csr vs. ssr diff using mockserver http://xxxx.mockapi.io

http://localhost:3000/pages/csrssr

---

## case.3 React Quill 입력 content 출력하기, backgound image를 깔고서

```
npm install sqlite sqlite
npm install react-quill
```

http://localhost:3000/pages/quill/display (출력)

http://localhost:3000/pages/quill (입력창)

---

### 백그라운드 이미지의 경우에는 <Image /> 쓰는 경우 lazy loading 그리고 next.config.mjs에 셋팅해주는 것까지 고려해줘야 하더라~~~

Lazy Loading
지연 로딩: 이미지가 화면에 보일 때만 로드하도록 지연 로딩을 적용합니다. Next.js의 Image 컴포넌트는 기본적으로 lazy loading을 지원합니다.

next.config.mjs 에 해당 이미지가 있는 url 도메인 주소를 넣어줘야한다.
// Example image URLs
const imageUrl1 = "https://picsum.photos/id/10/400/300";

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"], // Add 'picsum.photos' to the allowed domains
  },
};

export default nextConfig;
```
