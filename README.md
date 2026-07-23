# HK.KIM Portfolio (2026)

UI 디자이너·퍼블리셔 개인 포트폴리오 웹사이트입니다.  
웹/앱 UI 디자인·퍼블리싱 작업물을 케이스 스터디 형태로 정리했습니다.  
(클라이언트·소속 업체 실명은 공개용으로 일반화되어 있습니다.)

> 개인 포트폴리오용입니다. 무단 복제·재배포를 금지합니다. 

---

## Overview

| Item | Detail |
| --- | --- |
| Type | 개인 포트폴리오 웹 (정적 사이트) |
| Role | UI Design / Publishing |
| Stack | HTML5, CSS3, Vanilla JS, GSAP, ScrollTrigger, Splitting.js, XEIcon |
| Font | SUIT, Playfair Display |

빌드 도구 없이 HTML을 바로 열어 확인할 수 있습니다.  
애니메이션·스크립트는 **Live Server 등 로컬 서버**로 보는 것을 권장합니다.

---

## Structure

```
2026year/
├── index.html          # 메인
├── work.html           # 작업 목록
├── about.html          # 소개·경력
├── *.html              # 프로젝트 상세 케이스
├── css/                # common, style, xeicon
├── font/
├── images/
├── js/
├── source/             # 일부 프로젝트 퍼블리싱 샘플 원본
│   ├── elevator/
│   ├── school/
│   └── company/
├── robots.txt          # 검색엔진 수집 차단
└── README.md
```

---

## Pages

### Portfolio shell
| File | Description |
| --- | --- |
| `index.html` | 메인 비주얼 · 대표 작업 진입 |
| `work.html` | WORK 리스트 |
| `about.html` | ABOUT · 최근 프로젝트 |

### Case studies
| File | Theme |
| --- | --- |
| `freshway.html` | 물류 웹앱 고도화 |
| `ilyang.html` | 배송앱 고도화 |
| `hp.html` | 기업 홈페이지 리뉴얼 |
| `school.html` | 교육 서비스 사용자 앱 |
| `elevator.html` | 공공기관 홈페이지 리뉴얼 |
| `chunho.html` | 네이티브앱·관리시스템 리뉴얼 |
| `cms.html` | 관리시스템 UI |
| `saas.html` | SaaS / 클라우드 관련 |
| `etc.html` | 배너·기타 |

### Embedded publishing samples (`source/`)
케이스 상세에서 「퍼블리싱 일부 보기」로 연결되는 정적 마크업 샘플입니다.

---

## How to Preview

1. VS Code **Live Server** 등으로 `2026year` 루트를 연다.
2. `index.html`부터 확인한다.
3. Chrome DevTools로 PC / 모바일 반응형을 함께 본다.

일부 이미지 경로가 루트 절대경로(`/images/...`)라서, `file://`로 열면 깨질 수 있습니다. **로컬 서버 사용을 권장**합니다.

---

## Tech Notes

- GSAP + ScrollTrigger — 스크롤·타이핑 모션
- Splitting.js — 텍스트 분할 애니메이션
- `meta name="robots" content="noindex, nofollow"` — 페이지 단위 검색 제외
- `robots.txt` — `Disallow: /` (검색 수집 차단 힌트)

> `robots.txt` / `noindex`는 **검색엔진용**입니다.  
> URL을 아는 사람·GitHub Public 저장소 열람은 막지 않습니다.

---

## Contact

포트폴리오 사이트 푸터 기준 연락처를 사용합니다.

---

## License

© HK.KIM — Personal portfolio. All rights reserved.  
포함된 클라이언트·브랜드 자산의 권리는 각 권리자에게 있습니다.
