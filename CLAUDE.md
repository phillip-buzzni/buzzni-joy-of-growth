# Joy of Growth - HR 시스템

버즈니 구성원(67명)을 위한 통합 HR 성장 관리 시스템

## 프로젝트 개요

**기술 스택:**
- Frontend: Svelte 5 (Runes API)
- Styling: Tailwind CSS v4
- Backend: Firebase (예정)
- 개발 모드: Mock 데이터 사용

## 구현 완료 기능

### 1. 사용자 관리 (Users)
- 67명의 구성원 목록 표시
- 필터링: 스쿼드, 챕터, 레벨별
- 사용자 상세 정보 보기

**파일:**
- `src/lib/components/UserList.svelte`
- `src/lib/components/UserCard.svelte`
- `src/lib/data/mockUsers.json`

### 2. 인재상 (Leadership Principles)
5가지 핵심 가치:
1. 고객 중심 (Customer Obsession)
2. 주인 의식 (Ownership)
3. 혁신과 단순화 (Innovate and Simplify)
4. 올바른 판단 (Are Right, A Lot)
5. 배우고 성장하기 (Learn and Be Curious)

**기능:**
- 각 원칙별 행동 지표 확인
- 5점 척도 자가 평가
- 실시간 평점 계산

**파일:**
- `src/lib/components/Principles.svelte`
- `src/lib/components/PrincipleCard.svelte`
- `src/lib/components/PrincipleDetail.svelte`
- `src/lib/components/PrincipleAssessment.svelte`
- `src/lib/data/principlesData.js`

### 3. Job Matrix (직무 레벨)
**레벨:** L1 (Junior) ~ L10 (Distinguished)

**직군별 역량 정의:**
- Engineering (프론트엔드, 백엔드, 커머스플랫폼)
- Data & AI
- Product
- Design
- Business
- Marketing
- Corporate

**표시 모드:**
- 카드 뷰: 레벨별 상세 설명
- 테이블 뷰: 전체 레벨 한눈에 비교

**파일:**
- `src/lib/components/JobMatrix.svelte`
- `src/lib/components/LevelCard.svelte`
- `src/lib/components/JobMatrixTable.svelte`
- `src/lib/data/levelsData.js`
- `src/lib/data/jobFamilies.js`
- `src/lib/data/jobMatrixByFamily.js`

### 4. OKR 관리
**OKR 유형:**
- 전사 OKR (Company)
- 스쿼드 OKR (Squad)
- 챕터 OKR (Chapter)

**실제 스쿼드:**
- 커머스 AI 코어 스쿼드
- 마케팅 스쿼드
- 홈쇼핑모아
- APLUS AI

**실제 챕터:**
- 프론트엔드 엔지니어링
- 서비스 백엔드 엔지니어링
- 프로덕트 디자인

**기능:**
- OKR 목록 (카드 뷰)
- 진행률 시각화
- 상태별 필터 (정상 진행/주의 필요/지연)
- 정렬 수준별 필터 (전사/스쿼드/챕터)
- 스쿼드/챕터별 필터
- 참여 인원 표시
- Key Results 추적
- 그룹별 분리 표시

**파일:**
- `src/lib/components/OKRList.svelte`
- `src/lib/components/OKRCard.svelte`
- `src/lib/components/OKRDetail.svelte`
- `src/lib/data/okrData.js`

## 예정 기능

### 5. 360도 피드백 시스템
- 동료 평가 요청/응답
- 상향/하향/동료 피드백
- 익명성 보장 옵션

### 6. 개인 성장 대시보드
- 나의 레벨 현황
- 나의 OKR 진행률
- 받은 피드백 요약
- 성장 목표 설정

### 7. 1:1 미팅 관리
- 매니저-멤버 간 1:1 일정
- 미팅 노트/액션 아이템
- 과거 미팅 히스토리

### 8. 팀 현황 대시보드
- 스쿼드/챕터별 통계
- OKR 달성률 시각화
- 레벨 분포도

### 9. 알림/액션 센터
- 평가 요청 알림
- OKR 업데이트 리마인더
- 1:1 미팅 예정

## 프로젝트 구조

```
src/
├── lib/
│   ├── components/
│   │   ├── UserList.svelte
│   │   ├── UserCard.svelte
│   │   ├── Principles.svelte
│   │   ├── PrincipleCard.svelte
│   │   ├── PrincipleDetail.svelte
│   │   ├── PrincipleAssessment.svelte
│   │   ├── JobMatrix.svelte
│   │   ├── LevelCard.svelte
│   │   ├── JobMatrixTable.svelte
│   │   ├── OKRList.svelte
│   │   ├── OKRCard.svelte
│   │   └── OKRDetail.svelte
│   └── data/
│       ├── mockUsers.json (67명 구성원 데이터)
│       ├── principlesData.js (5가지 인재상)
│       ├── levelsData.js (L1-L10 레벨 정의)
│       ├── jobFamilies.js (7개 직군)
│       ├── jobMatrixByFamily.js (직군별 역량)
│       └── okrData.js (OKR 데이터)
├── App.svelte (메인 앱, 네비게이션)
└── app.css (Tailwind CSS)
```

## Svelte 5 주요 패턴

### Runes API 사용
```javascript
// 상태 관리
let currentView = $state('users');

// 파생 상태
let filteredUsers = $derived(
  users.filter(u => /* 조건 */)
);

// Props
let { user, onSelect } = $props();
```

### 반응형 필터링
- 스쿼드, 챕터, 레벨별 실시간 필터
- $derived를 활용한 성능 최적화

## 개발 가이드

### 로컬 실행
```bash
npm install
npm run dev
```

### Mock 데이터 위치
- 사용자: `src/lib/data/mockUsers.json`
- 인재상: `src/lib/data/principlesData.js`
- 레벨: `src/lib/data/levelsData.js`
- OKR: `src/lib/data/okrData.js`

### 새로운 기능 추가 시
1. `src/lib/data/` 에 mock 데이터 생성
2. `src/lib/components/` 에 컴포넌트 생성
3. `src/App.svelte` 에 네비게이션 추가
4. Svelte 5 runes ($state, $derived, $props) 사용

## 주요 이슈 해결 내역

### Svelte 5 마이그레이션
- `export let` → `$props()` 변경
- 반응성: `let` → `$state()`
- 계산된 값: `$:` → `$derived()`

### Tailwind CSS v4
- `@import "tailwindcss"` 사용
- `@tailwindcss/postcss` 플러그인 설정

### 데이터 구조
- Mock 데이터와 실제 구성원 정보 매핑
- OKR에 실제 스쿼드/챕터 정보 연동
- 참여 인원 ID 매칭

## 다음 단계

현재 Todo 리스트:
1. [ ] 360도 피드백 시스템 구현
2. [ ] 개인 성장 대시보드 구현
3. [ ] 1:1 미팅 관리 시스템 구현
4. [ ] 팀 현황 대시보드 구현
5. [ ] 알림/액션 센터 구현

---

**마지막 업데이트:** 2025-11-11
**개발자:** Claude + Phillip
