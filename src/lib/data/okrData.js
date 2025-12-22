// OKR (Objectives and Key Results) 데이터 구조
// 계층 구조: Company OKR → Team OKR (Squad/Chapter) → Personal OKR
// 성과 지향적이면서 역량 성장과 연계

export const okrCycles = [
  {
    id: '2025-q1',
    name: '2025 Q1',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    status: 'active'
  },
  {
    id: '2024-q4',
    name: '2024 Q4',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    status: 'completed'
  }
];

// OKR 레벨 정의
export const okrLevels = {
  company: { name: '전사', icon: '🏢', description: '회사 전체의 전략적 목표' },
  team: { name: '팀', icon: '👥', description: '스쿼드/챕터의 팀 목표' },
  personal: { name: '개인', icon: '👤', description: '개인의 성장 및 기여 목표' }
};

// 샘플 OKR 데이터
export const sampleOKRs = [
  // ========== 전사 OKR (Company Level) ==========
  {
    id: 'okr-company-1',
    cycleId: '2025-q1',
    level: 'company',
    ownerId: null, // 전사 OKR
    ownerType: 'company',
    parentOKRId: null,
    squad: null,
    chapter: null,
    objective: '버즈니 커머스 플랫폼 혁신으로 MAU 30% 성장 달성',
    description: 'AI 기반 개인화와 사용자 경험 혁신을 통한 시장 지배력 강화',
    category: 'product',
    progress: 65,
    status: 'on-track',
    createdAt: '2025-01-02',
    participants: ['100925427819464696032', '103598657260934052246'], // peter, justin
    relatedCompetencies: ['customer-obsession', 'innovation', 'strategic-thinking'],
    keyResults: [
      {
        id: 'kr-company-1-1',
        description: 'MAU(월간 활성 사용자) 500만 → 650만 달성',
        target: 650,
        current: 580,
        unit: '만명',
        progress: 53,
        status: 'on-track',
        milestones: [
          { date: '2025-01-31', target: 530, actual: 535, note: '신규 AI 추천 기능 출시' },
          { date: '2025-02-28', target: 590, actual: 580, note: '마케팅 캠페인 진행 중' }
        ]
      },
      {
        id: 'kr-company-1-2',
        description: '평균 세션 시간 15분 → 20분 증가',
        target: 20,
        current: 17.5,
        unit: '분',
        progress: 50,
        status: 'on-track'
      },
      {
        id: 'kr-company-1-3',
        description: '사용자 만족도(NPS) 40 → 55 향상',
        target: 55,
        current: 48,
        unit: '점',
        progress: 53,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-company-2',
    cycleId: '2025-q1',
    level: 'company',
    ownerId: null,
    ownerType: 'company',
    parentOKRId: null,
    squad: null,
    chapter: null,
    objective: '조직 생산성 20% 향상 및 엔지니어링 역량 강화',
    description: 'DevOps 자동화, 개발 문화 개선, 인재 육성을 통한 조직 효율성 극대화',
    category: 'engineering',
    progress: 45,
    status: 'at-risk',
    createdAt: '2025-01-02',
    participants: ['100925427819464696032', '103598657260934052246'],
    relatedCompetencies: ['operational-excellence', 'ownership', 'continuous-learning'],
    keyResults: [
      {
        id: 'kr-company-2-1',
        description: '배포 시간 60분 → 30분 단축',
        target: 30,
        current: 42,
        unit: '분',
        progress: 60,
        status: 'on-track'
      },
      {
        id: 'kr-company-2-2',
        description: '코드 리뷰 시간 24시간 → 12시간 단축',
        target: 12,
        current: 18,
        unit: '시간',
        progress: 50,
        status: 'at-risk'
      },
      {
        id: 'kr-company-2-3',
        description: '자동화 테스트 커버리지 60% → 80% 증가',
        target: 80,
        current: 65,
        unit: '%',
        progress: 25,
        status: 'at-risk'
      }
    ]
  },
  {
    id: 'okr-company-3',
    cycleId: '2025-q1',
    level: 'company',
    ownerId: null,
    ownerType: 'company',
    parentOKRId: null,
    squad: null,
    chapter: null,
    objective: '거래액(GMV) 전년 대비 40% 성장',
    description: '신규 카테고리 확장, 결제 최적화, AI 추천으로 매출 성장 가속화',
    category: 'business',
    progress: 58,
    status: 'on-track',
    createdAt: '2025-01-02',
    participants: ['100925427819464696032', '103598657260934052246'],
    relatedCompetencies: ['results-driven', 'data-driven-decision', 'strategic-thinking'],
    keyResults: [
      {
        id: 'kr-company-3-1',
        description: '월 GMV 280억 → 390억 달성',
        target: 390,
        current: 335,
        unit: '억원',
        progress: 50,
        status: 'on-track'
      },
      {
        id: 'kr-company-3-2',
        description: '결제 완료율 62% → 75% 개선',
        target: 75,
        current: 68,
        unit: '%',
        progress: 46,
        status: 'on-track'
      },
      {
        id: 'kr-company-3-3',
        description: '신규 카테고리 5개 론칭',
        target: 5,
        current: 3,
        unit: '개',
        progress: 60,
        status: 'on-track'
      }
    ]
  },

  // ========== 팀 OKR (Team Level - Squad) ==========
  {
    id: 'okr-team-1',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '6321709e-159f-485c-96d8-a059f85ca1c9', // 토니 (스쿼드 리더)
    ownerType: 'squad',
    parentOKRId: 'okr-company-1', // 전사 OKR에 연결
    squad: '커머스 AI 코어 스쿼드',
    chapter: null,
    objective: 'AI 추천 시스템으로 전환율 25% 개선',
    description: 'ML 모델 고도화와 실시간 추천으로 구매 전환율 향상',
    category: 'product',
    progress: 55,
    status: 'on-track',
    createdAt: '2025-01-08',
    participants: ['103598657260934052246', '6321709e-159f-485c-96d8-a059f85ca1c9', '949f19e6-28f6-401f-9e7d-d657bfe78b1c', '112774292394672981209', '109907519810805504587'], // 저스틴, 토니, 미노, 송디, 틴틴
    relatedCompetencies: ['innovation', 'technical-excellence', 'collaboration'],
    keyResults: [
      {
        id: 'kr-team-1-1',
        description: 'AI 추천 CTR 5% → 8% 증가',
        target: 8,
        current: 6.5,
        unit: '%',
        progress: 60,
        status: 'on-track'
      },
      {
        id: 'kr-team-1-2',
        description: '추천 상품 전환율 2% → 2.5% 증가',
        target: 2.5,
        current: 2.2,
        unit: '%',
        progress: 40,
        status: 'on-track'
      },
      {
        id: 'kr-team-1-3',
        description: '추천 알고리즘 정확도 65% → 78% 향상',
        target: 78,
        current: 71,
        unit: '%',
        progress: 46,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-team-2',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '117166740015018198666', // 넥스 (스쿼드 리더)
    ownerType: 'squad',
    parentOKRId: 'okr-company-3', // 전사 OKR (매출 성장)에 연결
    squad: '마케팅 스쿼드',
    chapter: null,
    objective: '브랜드 인지도 향상으로 신규 유저 20만명 확보',
    description: '통합 마케팅 캠페인과 바이럴 전략으로 브랜드 파워 강화',
    category: 'business',
    progress: 48,
    status: 'at-risk',
    createdAt: '2025-01-09',
    participants: ['112898034646352131716', '117166740015018198666', '7d4ca0f1-9a63-49d3-9b18-f9e166659385', 'c1fbeb93-52ec-4bfc-b390-fbfb341986c5', '78c6f481-c6cb-4e9b-b1f8-badcaa0d7854'], // 안나, 넥스, 이안, 앤디, 홉
    relatedCompetencies: ['customer-obsession', 'creativity', 'data-driven-decision'],
    keyResults: [
      {
        id: 'kr-team-2-1',
        description: '브랜드 인지도 25% → 40% 증가',
        target: 40,
        current: 32,
        unit: '%',
        progress: 47,
        status: 'at-risk'
      },
      {
        id: 'kr-team-2-2',
        description: '신규 가입자 20만명 확보',
        target: 20,
        current: 11.5,
        unit: '만명',
        progress: 58,
        status: 'on-track'
      },
      {
        id: 'kr-team-2-3',
        description: '마케팅 ROI 1.5 → 2.2 개선',
        target: 2.2,
        current: 1.85,
        unit: '배',
        progress: 50,
        status: 'at-risk'
      }
    ]
  },
  {
    id: 'okr-team-3',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '100128624058600024149', // 아가사 (스쿼드 리더)
    ownerType: 'squad',
    parentOKRId: 'okr-company-1', // 전사 OKR (사용자 경험)에 연결
    squad: '홈쇼핑모아',
    chapter: null,
    objective: '방송 품질 개선으로 이탈률 35% → 22% 감소',
    description: '실시간 스트리밍 안정성 강화 및 상품 탐색 UX 개선',
    category: 'product',
    progress: 70,
    status: 'on-track',
    createdAt: '2025-01-06',
    participants: ['100128624058600024149', '112898034646352131716', '100236209927709200803', '105340291157400975387', '109907519810805504587'], // 아가사, 안나, 제이, 에이미, 틴틴
    relatedCompetencies: ['customer-obsession', 'operational-excellence', 'ownership'],
    keyResults: [
      {
        id: 'kr-team-3-1',
        description: '방송 버퍼링 시간 5초 → 2초 단축',
        target: 2,
        current: 2.3,
        unit: '초',
        progress: 90,
        status: 'on-track'
      },
      {
        id: 'kr-team-3-2',
        description: '상품 검색 정확도 75% → 88% 향상',
        target: 88,
        current: 83,
        unit: '%',
        progress: 62,
        status: 'on-track'
      },
      {
        id: 'kr-team-3-3',
        description: '사용자 이탈률 35% → 22% 감소',
        target: 22,
        current: 26,
        unit: '%',
        progress: 69,
        status: 'on-track'
      }
    ]
  },

  // ========== 팀 OKR (Team Level - Chapter) ==========
  {
    id: 'okr-team-4',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '117419763454154203072', // 이리나 (챕터 리더)
    ownerType: 'chapter',
    parentOKRId: 'okr-company-2', // 전사 OKR (생산성)에 연결
    squad: null,
    chapter: '프론트엔드 엔지니어링',
    objective: '웹 성능 최적화로 초기 로딩 50% 단축',
    description: '번들 최적화, 코드 스플리팅, 캐싱 전략으로 사용자 경험 개선',
    category: 'engineering',
    progress: 62,
    status: 'on-track',
    createdAt: '2025-01-07',
    participants: ['117419763454154203072', 'b3f2bcc5-9aeb-4aa8-be98-ea6b686545f4', 'a9b05343-100c-42b7-82e9-8fd398fa18a5', '2fc45c49-ae0f-4aad-b1df-69660319097f'], // 이리나, 준, 무벅, 하니
    relatedCompetencies: ['technical-excellence', 'operational-excellence', 'continuous-learning'],
    keyResults: [
      {
        id: 'kr-team-4-1',
        description: '초기 로딩 시간 3초 → 1.5초 단축',
        target: 1.5,
        current: 1.9,
        unit: '초',
        progress: 73,
        status: 'on-track'
      },
      {
        id: 'kr-team-4-2',
        description: 'Core Web Vitals 점수 75 → 90 향상',
        target: 90,
        current: 84,
        unit: '점',
        progress: 60,
        status: 'on-track'
      },
      {
        id: 'kr-team-4-3',
        description: '재사용 가능 컴포넌트 40% → 65% 증가',
        target: 65,
        current: 56,
        unit: '%',
        progress: 64,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-team-5',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '114684699230788515528', // 티거 (챕터 리더)
    ownerType: 'chapter',
    parentOKRId: 'okr-company-2', // 전사 OKR (생산성)에 연결
    squad: null,
    chapter: '서비스 백엔드 엔지니어링',
    objective: 'API 안정성 강화로 서버 가동률 99.9% 달성',
    description: '장애 복구 자동화, 모니터링 고도화, 성능 최적화',
    category: 'engineering',
    progress: 38,
    status: 'at-risk',
    createdAt: '2025-01-09',
    participants: ['114684699230788515528', '107457554367725754346', '7d4ca0f1-9a63-49d3-9b18-f9e166659385', '662080a9-3b11-477d-a7f4-fdf11db7755b', 'fc22fb79-29b7-4dba-9d68-b5c2ae96a79d'], // 티거, 찰리, 이안, 윌리엄, 휴고
    relatedCompetencies: ['technical-excellence', 'ownership', 'problem-solving'],
    keyResults: [
      {
        id: 'kr-team-5-1',
        description: 'API 평균 응답시간 500ms → 200ms 단축',
        target: 200,
        current: 310,
        unit: 'ms',
        progress: 63,
        status: 'on-track'
      },
      {
        id: 'kr-team-5-2',
        description: '서버 가동률 99.5% → 99.9% 향상',
        target: 99.9,
        current: 99.65,
        unit: '%',
        progress: 38,
        status: 'at-risk'
      },
      {
        id: 'kr-team-5-3',
        description: '장애 평균 복구시간 30분 → 10분 단축',
        target: 10,
        current: 20,
        unit: '분',
        progress: 50,
        status: 'at-risk'
      }
    ]
  },
  {
    id: 'okr-team-6',
    cycleId: '2025-q1',
    level: 'team',
    ownerId: '112898034646352131716', // 안나 (챕터 리더)
    ownerType: 'chapter',
    parentOKRId: 'okr-company-1', // 전사 OKR (사용자 경험)에 연결
    squad: null,
    chapter: '프로덕트 디자인',
    objective: '디자인 시스템 2.0으로 제품 일관성 70% 달성',
    description: '통합 디자인 시스템 구축 및 전사 적용으로 브랜드 일관성 확보',
    category: 'product',
    progress: 55,
    status: 'on-track',
    createdAt: '2025-01-08',
    participants: ['112898034646352131716', '114713415598826036662', 'ade51910-1af5-45b2-b742-3a52342bad8c', '501c474b-1f6a-4fcb-91b1-a72a41d089a0'], // 안나, 필립, 션, 아녜스
    relatedCompetencies: ['creativity', 'collaboration', 'attention-to-detail'],
    keyResults: [
      {
        id: 'kr-team-6-1',
        description: '디자인 컴포넌트 라이브러리 80개 완성',
        target: 80,
        current: 54,
        unit: '개',
        progress: 68,
        status: 'on-track'
      },
      {
        id: 'kr-team-6-2',
        description: '디자인 시스템 적용률 30% → 70% 증가',
        target: 70,
        current: 50,
        unit: '%',
        progress: 50,
        status: 'on-track'
      },
      {
        id: 'kr-team-6-3',
        description: '디자인 QA 이슈 50건 → 15건 감소',
        target: 15,
        current: 26,
        unit: '건',
        progress: 69,
        status: 'on-track'
      }
    ]
  },

  // ========== 개인 OKR (Personal Level) ==========
  {
    id: 'okr-personal-1',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: '112774292394672981209', // 송디
    ownerType: 'user',
    parentOKRId: 'okr-team-1', // 팀 OKR (AI 추천)에 연결
    squad: 'APLUS AI',
    chapter: 'AI/ML 엔지니어링',
    objective: 'ML 모델 성능 향상과 실시간 학습 파이프라인 구축',
    description: '추천 정확도 개선 및 모델 학습 주기 단축으로 팀 OKR 기여',
    category: 'engineering',
    progress: 52,
    status: 'on-track',
    createdAt: '2025-01-11',
    participants: ['112774292394672981209'],
    relatedCompetencies: ['technical-excellence', 'continuous-learning', 'problem-solving'],
    competencyGrowth: {
      targetLevel: 'senior', // 현재 mid → senior 성장 목표
      focusAreas: ['ML 모델링', '분산 처리', '데이터 파이프라인']
    },
    keyResults: [
      {
        id: 'kr-personal-1-1',
        description: '추천 정확도(Precision) 65% → 78% 향상',
        target: 78,
        current: 72,
        unit: '%',
        progress: 54,
        status: 'on-track',
        contributesTo: 'kr-team-1-3' // 팀 KR에 기여
      },
      {
        id: 'kr-personal-1-2',
        description: '모델 학습 주기 7일 → 1일 단축',
        target: 1,
        current: 2.5,
        unit: '일',
        progress: 75,
        status: 'on-track'
      },
      {
        id: 'kr-personal-1-3',
        description: 'ML 엔지니어링 테크 톡 2회 발표 (역량 성장)',
        target: 2,
        current: 1,
        unit: '회',
        progress: 50,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-personal-2',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: '109907519810805504587', // 틴틴
    ownerType: 'user',
    parentOKRId: 'okr-team-1', // 팀 OKR (AI 추천)에 연결
    squad: 'APLUS AI',
    chapter: '프론트엔드 엔지니어링',
    objective: 'AI 추천 UI/UX 개선 및 프론트엔드 아키텍처 고도화',
    description: '사용자 친화적 추천 인터페이스 구축 및 성능 최적화',
    category: 'engineering',
    progress: 48,
    status: 'on-track',
    createdAt: '2025-01-12',
    participants: ['109907519810805504587'],
    relatedCompetencies: ['technical-excellence', 'user-centric-design', 'collaboration'],
    competencyGrowth: {
      targetLevel: 'senior',
      focusAreas: ['React 아키텍처', '성능 최적화', 'A/B 테스트']
    },
    keyResults: [
      {
        id: 'kr-personal-2-1',
        description: '추천 위젯 CTR 5% → 8% 증가',
        target: 8,
        current: 6.8,
        unit: '%',
        progress: 60,
        status: 'on-track',
        contributesTo: 'kr-team-1-1'
      },
      {
        id: 'kr-personal-2-2',
        description: '추천 페이지 로딩 시간 2초 → 1초 단축',
        target: 1,
        current: 1.3,
        unit: '초',
        progress: 70,
        status: 'on-track'
      },
      {
        id: 'kr-personal-2-3',
        description: '프론트엔드 컴포넌트 라이브러리 기여 10개 (역량 성장)',
        target: 10,
        current: 4,
        unit: '개',
        progress: 40,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-personal-3',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: 'b3f2bcc5-9aeb-4aa8-be98-ea6b686545f4', // 준
    ownerType: 'user',
    parentOKRId: 'okr-team-4', // 팀 OKR (프론트엔드 성능)에 연결
    squad: '커머스 AI 코어 스쿼드',
    chapter: '프론트엔드 엔지니어링',
    objective: '웹팩 최적화 및 코드 스플리팅으로 번들 사이즈 30% 감소',
    description: '빌드 최적화 전문성 확보 및 팀 생산성 향상에 기여',
    category: 'engineering',
    progress: 65,
    status: 'on-track',
    createdAt: '2025-01-10',
    participants: ['b3f2bcc5-9aeb-4aa8-be98-ea6b686545f4'],
    relatedCompetencies: ['technical-excellence', 'operational-excellence', 'continuous-learning'],
    competencyGrowth: {
      targetLevel: 'senior',
      focusAreas: ['빌드 최적화', 'Webpack/Vite', '성능 튜닝']
    },
    keyResults: [
      {
        id: 'kr-personal-3-1',
        description: '초기 번들 사이즈 2MB → 1.4MB 감소',
        target: 1.4,
        current: 1.6,
        unit: 'MB',
        progress: 67,
        status: 'on-track',
        contributesTo: 'kr-team-4-1'
      },
      {
        id: 'kr-personal-3-2',
        description: 'Lighthouse 성능 점수 75 → 90 향상',
        target: 90,
        current: 85,
        unit: '점',
        progress: 67,
        status: 'on-track',
        contributesTo: 'kr-team-4-2'
      },
      {
        id: 'kr-personal-3-3',
        description: '빌드 최적화 가이드 문서 작성 및 팀 공유 (역량 성장)',
        target: 1,
        current: 0,
        unit: '개',
        progress: 30,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-personal-4',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: '107457554367725754346', // 찰리
    ownerType: 'user',
    parentOKRId: 'okr-team-5', // 팀 OKR (백엔드 안정성)에 연결
    squad: '커머스 AI 코어 스쿼드',
    chapter: '서비스 백엔드 엔지니어링',
    objective: 'API 응답 속도 개선 및 장애 대응 자동화',
    description: '데이터베이스 쿼리 최적화 및 모니터링 시스템 고도화',
    category: 'engineering',
    progress: 55,
    status: 'on-track',
    createdAt: '2025-01-11',
    participants: ['107457554367725754346'],
    relatedCompetencies: ['technical-excellence', 'problem-solving', 'ownership'],
    competencyGrowth: {
      targetLevel: 'senior',
      focusAreas: ['데이터베이스 최적화', '분산 시스템', '장애 대응']
    },
    keyResults: [
      {
        id: 'kr-personal-4-1',
        description: '주요 API 응답시간 500ms → 200ms 단축',
        target: 200,
        current: 290,
        unit: 'ms',
        progress: 70,
        status: 'on-track',
        contributesTo: 'kr-team-5-1'
      },
      {
        id: 'kr-personal-4-2',
        description: 'DB 쿼리 최적화로 응답 시간 30% 개선',
        target: 30,
        current: 20,
        unit: '%',
        progress: 67,
        status: 'on-track'
      },
      {
        id: 'kr-personal-4-3',
        description: '백엔드 성능 최적화 사례 발표 1회 (역량 성장)',
        target: 1,
        current: 0,
        unit: '회',
        progress: 20,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-personal-5',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: '114713415598826036662', // 필립
    ownerType: 'user',
    parentOKRId: 'okr-team-6', // 팀 OKR (디자인 시스템)에 연결
    squad: '마케팅 스쿼드',
    chapter: '프로덕트 디자인',
    objective: '디자인 시스템 컴포넌트 30개 제작 및 브랜드 가이드 확립',
    description: 'UI 일관성 확보 및 디자이너-개발자 협업 효율 향상',
    category: 'product',
    progress: 60,
    status: 'on-track',
    createdAt: '2025-01-09',
    participants: ['114713415598826036662'],
    relatedCompetencies: ['creativity', 'attention-to-detail', 'collaboration'],
    competencyGrowth: {
      targetLevel: 'senior',
      focusAreas: ['디자인 시스템', 'Figma 고급', '브랜드 디자인']
    },
    keyResults: [
      {
        id: 'kr-personal-5-1',
        description: '디자인 시스템 컴포넌트 30개 제작',
        target: 30,
        current: 20,
        unit: '개',
        progress: 67,
        status: 'on-track',
        contributesTo: 'kr-team-6-1'
      },
      {
        id: 'kr-personal-5-2',
        description: '브랜드 컬러/타이포 가이드 완성 및 적용',
        target: 1,
        current: 1,
        unit: '개',
        progress: 100,
        status: 'on-track'
      },
      {
        id: 'kr-personal-5-3',
        description: '디자인 시스템 워크샵 2회 진행 (역량 성장)',
        target: 2,
        current: 1,
        unit: '회',
        progress: 50,
        status: 'on-track'
      }
    ]
  },
  {
    id: 'okr-personal-6',
    cycleId: '2025-q1',
    level: 'personal',
    ownerId: '7d4ca0f1-9a63-49d3-9b18-f9e166659385', // 이안
    ownerType: 'user',
    parentOKRId: 'okr-team-2', // 팀 OKR (마케팅)에 연결
    squad: '마케팅 스쿼드',
    chapter: '서비스 백엔드 엔지니어링',
    objective: '마케팅 데이터 파이프라인 구축 및 분석 자동화',
    description: '실시간 마케팅 지표 추적 시스템 개발로 의사결정 지원',
    category: 'engineering',
    progress: 42,
    status: 'at-risk',
    createdAt: '2025-01-13',
    participants: ['7d4ca0f1-9a63-49d3-9b18-f9e166659385'],
    relatedCompetencies: ['data-driven-decision', 'technical-excellence', 'collaboration'],
    competencyGrowth: {
      targetLevel: 'mid',
      focusAreas: ['데이터 파이프라인', 'ETL', '분석 도구']
    },
    keyResults: [
      {
        id: 'kr-personal-6-1',
        description: '마케팅 대시보드 실시간 데이터 연동',
        target: 1,
        current: 0,
        unit: '개',
        progress: 40,
        status: 'at-risk'
      },
      {
        id: 'kr-personal-6-2',
        description: 'ROI 계산 자동화 시스템 구축',
        target: 1,
        current: 0,
        unit: '개',
        progress: 30,
        status: 'at-risk',
        contributesTo: 'kr-team-2-3'
      },
      {
        id: 'kr-personal-6-3',
        description: '데이터 엔지니어링 스터디 참여 및 발표 (역량 성장)',
        target: 1,
        current: 1,
        unit: '회',
        progress: 100,
        status: 'on-track'
      }
    ]
  }
];

// OKR 상태별 색상
export const okrStatusColors = {
  'on-track': {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800'
  },
  'at-risk': {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  'off-track': {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800'
  }
};

// OKR 카테고리
export const okrCategories = {
  product: { name: '제품', icon: '🎯', color: 'blue' },
  engineering: { name: '엔지니어링', icon: '💻', color: 'purple' },
  business: { name: '비즈니스', icon: '💼', color: 'green' },
  people: { name: '인재/조직', icon: '👥', color: 'orange' },
  customer: { name: '고객', icon: '❤️', color: 'pink' }
};

// 상태별 한글명
export const statusLabels = {
  'on-track': '정상 진행',
  'at-risk': '주의 필요',
  'off-track': '지연'
};

// OKR 관계 분석 함수
export function getOKRHierarchy(okrId) {
  const okr = sampleOKRs.find(o => o.id === okrId);
  if (!okr) return null;

  // 상위 OKR 찾기
  const parent = okr.parentOKRId ? sampleOKRs.find(o => o.id === okr.parentOKRId) : null;

  // 하위 OKR 찾기
  const children = sampleOKRs.filter(o => o.parentOKRId === okrId);

  return {
    okr,
    parent,
    children,
    level: okr.level
  };
}

// 특정 사용자의 OKR 가져오기
export function getUserOKRs(userId, cycleId = '2025-q1') {
  return sampleOKRs.filter(okr =>
    okr.cycleId === cycleId &&
    (okr.ownerId === userId || okr.participants?.includes(userId))
  );
}

// 레벨별 OKR 필터링
export function getOKRsByLevel(level, cycleId = '2025-q1') {
  return sampleOKRs.filter(okr =>
    okr.cycleId === cycleId && okr.level === level
  );
}

// 팀(스쿼드/챕터) OKR 가져오기
export function getTeamOKRs(teamName, teamType = 'squad', cycleId = '2025-q1') {
  return sampleOKRs.filter(okr =>
    okr.cycleId === cycleId &&
    okr.level === 'team' &&
    (teamType === 'squad' ? okr.squad === teamName : okr.chapter === teamName)
  );
}

// OKR 계층 트리 생성
export function buildOKRTree(cycleId = '2025-q1') {
  const cycleOKRs = sampleOKRs.filter(okr => okr.cycleId === cycleId);
  const companyOKRs = cycleOKRs.filter(okr => okr.level === 'company');

  return companyOKRs.map(companyOKR => {
    const teamOKRs = cycleOKRs.filter(okr =>
      okr.level === 'team' && okr.parentOKRId === companyOKR.id
    );

    const teamOKRsWithPersonal = teamOKRs.map(teamOKR => {
      const personalOKRs = cycleOKRs.filter(okr =>
        okr.level === 'personal' && okr.parentOKRId === teamOKR.id
      );

      return {
        ...teamOKR,
        children: personalOKRs
      };
    });

    return {
      ...companyOKR,
      children: teamOKRsWithPersonal
    };
  });
}
