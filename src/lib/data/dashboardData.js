// 개인 성장 대시보드 데이터

// 성장 타임라인 (최근 활동)
export const growthTimeline = [
  {
    id: 'timeline-1',
    date: '2025-01-15',
    type: 'okr',
    title: 'Q1 OKR 목표 설정 완료',
    description: '프로덕트 품질 개선 OKR 3개 목표 설정',
    icon: '🎯',
    color: 'blue'
  },
  {
    id: 'timeline-2',
    date: '2025-01-10',
    type: 'feedback',
    title: '360도 피드백 5건 완료',
    description: '동료 피드백 평균 4.5/5.0 달성',
    icon: '💬',
    color: 'green'
  },
  {
    id: 'timeline-3',
    date: '2025-01-05',
    type: 'principle',
    title: '리더십 원칙 자가 평가',
    description: '5개 원칙 중 4개 "매우 잘함" 달성',
    icon: '⭐',
    color: 'purple'
  },
  {
    id: 'timeline-4',
    date: '2024-12-20',
    type: 'level',
    title: '레벨 상승: L3 → L4',
    description: 'Senior Engineer로 승진',
    icon: '📈',
    color: 'yellow'
  },
  {
    id: 'timeline-5',
    date: '2024-12-15',
    type: 'meeting',
    title: '1:1 미팅 (with 션)',
    description: '커리어 개발 방향성 논의',
    icon: '☕',
    color: 'gray'
  }
];

// 역량 점수 (레이더 차트용)
export const competencyScores = {
  '2024-q4': {
    technical: 4.2,
    collaboration: 4.5,
    leadership: 3.8,
    delivery: 4.3,
    growth: 4.0
  },
  '2025-q1': {
    technical: 4.5,
    collaboration: 4.6,
    leadership: 4.2,
    delivery: 4.4,
    growth: 4.3
  }
};

// 리더십 원칙 점수 추이
export const principleProgress = {
  labels: ['2024-Q2', '2024-Q3', '2024-Q4', '2025-Q1'],
  data: {
    'customer-obsession': [3.5, 3.8, 4.0, 4.2],
    'ownership': [3.2, 3.5, 3.8, 4.0],
    'invent-simplify': [3.8, 4.0, 4.2, 4.3],
    'learn-curious': [4.0, 4.2, 4.3, 4.5],
    'hire-develop': [3.0, 3.2, 3.5, 3.8]
  }
};

// OKR 달성률 추이
export const okrProgress = {
  labels: ['2024-Q2', '2024-Q3', '2024-Q4', '2025-Q1'],
  data: [65, 72, 78, 45] // Q1은 진행 중
};

// 피드백 점수 추이
export const feedbackTrend = {
  labels: ['2024-Q2', '2024-Q3', '2024-Q4', '2025-Q1'],
  received: [4.1, 4.2, 4.3, 4.5],
  given: [8, 10, 12, 5] // 건수
};

// 목표 및 달성 현황
export const currentGoals = [
  {
    id: 'goal-1',
    category: 'okr',
    title: '프로덕트 품질 개선',
    progress: 65,
    target: '2025-03-31',
    status: 'on-track'
  },
  {
    id: 'goal-2',
    category: 'principle',
    title: 'Ownership 4.0 달성',
    progress: 80,
    target: '2025-03-31',
    status: 'on-track'
  },
  {
    id: 'goal-3',
    category: 'feedback',
    title: '분기별 피드백 10건 완료',
    progress: 50,
    target: '2025-03-31',
    status: 'at-risk'
  },
  {
    id: 'goal-4',
    category: 'level',
    title: 'L5 요건 충족',
    progress: 40,
    target: '2025-12-31',
    status: 'on-track'
  }
];

// 성장 인사이트
export const growthInsights = [
  {
    id: 'insight-1',
    type: 'strength',
    title: '강점: 협업 능력',
    description: '최근 3분기 연속 협업 점수 4.5 이상 유지',
    icon: '💪',
    actionable: false
  },
  {
    id: 'insight-2',
    type: 'improvement',
    title: '개선 필요: 리더십',
    description: '리더십 점수가 다른 역량 대비 낮습니다. 팀 리딩 기회를 찾아보세요.',
    icon: '📊',
    actionable: true,
    action: '1:1 미팅에서 리더십 개발 논의하기'
  },
  {
    id: 'insight-3',
    type: 'trend',
    title: '상승 추세: 기술 역량',
    description: '기술 역량이 지난 분기 대비 0.3점 상승했습니다.',
    icon: '📈',
    actionable: false
  },
  {
    id: 'insight-4',
    type: 'action',
    title: '액션 필요: 피드백 요청',
    description: '이번 분기 피드백 5건이 아직 미완료입니다.',
    icon: '⚠️',
    actionable: true,
    action: '피드백 요청하기'
  }
];

// 뱃지 및 성취
export const achievements = [
  {
    id: 'badge-1',
    name: '피드백 마스터',
    description: '한 분기에 15건 이상의 피드백 완료',
    icon: '🏆',
    earnedAt: '2024-12-31',
    rarity: 'gold'
  },
  {
    id: 'badge-2',
    name: 'OKR 챔피언',
    description: '3분기 연속 OKR 80% 이상 달성',
    icon: '🎯',
    earnedAt: '2024-09-30',
    rarity: 'silver'
  },
  {
    id: 'badge-3',
    name: '빠른 성장',
    description: '6개월 만에 레벨 업',
    icon: '🚀',
    earnedAt: '2024-12-20',
    rarity: 'gold'
  },
  {
    id: 'badge-4',
    name: '협업왕',
    description: '협업 점수 4분기 연속 4.5 이상',
    icon: '🤝',
    earnedAt: '2025-01-15',
    rarity: 'platinum'
  }
];

// 추천 액션
export const recommendedActions = [
  {
    id: 'action-1',
    title: '피드백 5건 완료하기',
    description: '분기 목표 달성을 위해 5건의 피드백이 더 필요합니다.',
    priority: 'high',
    deadline: '2025-03-31',
    link: '/feedback'
  },
  {
    id: 'action-2',
    title: '리더십 원칙 재평가',
    description: 'Q1 종료 전 자가 평가를 업데이트하세요.',
    priority: 'medium',
    deadline: '2025-03-31',
    link: '/principles'
  },
  {
    id: 'action-3',
    title: 'OKR 진행률 업데이트',
    description: '2주 동안 업데이트되지 않은 OKR이 있습니다.',
    priority: 'medium',
    deadline: '2025-02-15',
    link: '/okr'
  },
  {
    id: 'action-4',
    title: '1:1 미팅 예약',
    description: '다음 1:1 미팅 일정을 잡으세요.',
    priority: 'low',
    deadline: '2025-02-28',
    link: '/meetings'
  }
];

// 비교 데이터 (팀 평균과 비교)
export const benchmarkData = {
  myScore: 4.3,
  teamAverage: 4.0,
  companyAverage: 3.8,
  topPerformer: 4.7,
  categories: {
    technical: { my: 4.5, team: 4.2, company: 4.0 },
    collaboration: { my: 4.6, team: 4.3, company: 4.1 },
    leadership: { my: 4.2, team: 3.9, company: 3.7 },
    delivery: { my: 4.4, team: 4.1, company: 3.9 },
    growth: { my: 4.3, team: 4.0, company: 3.8 }
  }
};
