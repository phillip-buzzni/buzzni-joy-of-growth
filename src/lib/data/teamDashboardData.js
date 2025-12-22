// 팀 현황 대시보드 데이터

import mockUsers from './mockUsers.json';

// 팀 통계
export const teamStats = {
  totalMembers: 67,
  squads: 5,
  chapters: 6,
  avgTenure: 2.4, // 평균 재직 기간 (년)
  newHires: 3, // 최근 3개월 신규 입사
  growth: {
    lastQuarter: 8, // 지난 분기 대비 증가
    percentage: 13.5
  }
};

// 스쿼드별 현황
export const squadOverview = [
  {
    id: 'squad-1',
    name: '커머스 AI 코어 스쿼드',
    memberCount: 15,
    okrProgress: 78,
    avgFeedbackScore: 4.3,
    activeProjects: 3,
    completedMilestones: 12,
    upcomingDeadlines: 2,
    health: 'healthy' // healthy, at-risk, critical
  },
  {
    id: 'squad-2',
    name: '추천 스쿼드',
    memberCount: 12,
    okrProgress: 65,
    avgFeedbackScore: 4.1,
    activeProjects: 2,
    completedMilestones: 8,
    upcomingDeadlines: 3,
    health: 'healthy'
  },
  {
    id: 'squad-3',
    name: 'Growth 스쿼드',
    memberCount: 10,
    okrProgress: 45,
    avgFeedbackScore: 3.9,
    activeProjects: 4,
    completedMilestones: 5,
    upcomingDeadlines: 5,
    health: 'at-risk'
  }
];

// 챕터별 현황
export const chapterOverview = [
  {
    id: 'chapter-1',
    name: '프론트엔드',
    memberCount: 18,
    avgSkillLevel: 3.5,
    ongoingInitiatives: [
      '성능 최적화 프로젝트',
      '디자인 시스템 2.0',
      'React 19 마이그레이션'
    ],
    techDebt: 'medium', // low, medium, high
    learningActivities: 8
  },
  {
    id: 'chapter-2',
    name: '백엔드',
    memberCount: 22,
    avgSkillLevel: 3.8,
    ongoingInitiatives: [
      'MSA 전환',
      'DB 샤딩',
      'API 성능 개선'
    ],
    techDebt: 'high',
    learningActivities: 12
  },
  {
    id: 'chapter-3',
    name: '프로덕트 디자인',
    memberCount: 8,
    avgSkillLevel: 4.0,
    ongoingInitiatives: [
      '디자인 시스템 구축',
      'UX 리서치',
      '접근성 개선'
    ],
    techDebt: 'low',
    learningActivities: 6
  },
  {
    id: 'chapter-4',
    name: 'Data',
    memberCount: 10,
    avgSkillLevel: 3.9,
    ongoingInitiatives: [
      '데이터 파이프라인 구축',
      'ML 모델 최적화',
      '실시간 분석 시스템'
    ],
    techDebt: 'medium',
    learningActivities: 10
  },
  {
    id: 'chapter-5',
    name: 'QA',
    memberCount: 5,
    avgSkillLevel: 3.6,
    ongoingInitiatives: [
      '자동화 테스트 확대',
      '성능 테스트 도입',
      '테스트 커버리지 향상'
    ],
    techDebt: 'low',
    learningActivities: 4
  },
  {
    id: 'chapter-6',
    name: '프로덕트 오너',
    memberCount: 4,
    avgSkillLevel: 4.2,
    ongoingInitiatives: [
      '로드맵 수립',
      '고객 인터뷰',
      '지표 대시보드 구축'
    ],
    techDebt: 'low',
    learningActivities: 5
  }
];

// 레벨 분포
export const levelDistribution = [
  { level: 'L1', count: 5, percentage: 7.5 },
  { level: 'L2', count: 15, percentage: 22.4 },
  { level: 'L3', count: 25, percentage: 37.3 },
  { level: 'L4', count: 15, percentage: 22.4 },
  { level: 'L5', count: 5, percentage: 7.5 },
  { level: 'L6+', count: 2, percentage: 3.0 }
];

// OKR 전체 현황
export const companyOKRStatus = {
  totalObjectives: 24,
  onTrack: 18,
  atRisk: 4,
  offTrack: 2,
  avgProgress: 68,
  byAlignment: {
    company: { total: 3, avgProgress: 72 },
    squad: { total: 15, avgProgress: 67 },
    chapter: { total: 6, avgProgress: 70 }
  }
};

// 피드백 활동 현황
export const feedbackActivity = {
  totalRequests: 245,
  completed: 198,
  pending: 47,
  avgResponseTime: 4.2, // 일
  avgScore: 4.2,
  byType: {
    upward: { total: 56, completed: 48, avgScore: 4.0 },
    downward: { total: 89, completed: 72, avgScore: 4.3 },
    peer: { total: 100, completed: 78, avgScore: 4.2 }
  },
  mostActive: [
    { userId: '100925427819464696032', count: 15 },
    { userId: '949f19e6-28f6-401f-9e7d-d657bfe78b1c', count: 14 },
    { userId: '103598657260934052246', count: 12 }
  ]
};

// 1:1 미팅 현황
export const meetingActivity = {
  totalMeetings: 124,
  thisMonth: 32,
  avgFrequency: 'biweekly',
  avgDuration: 35, // 분
  completionRate: 95,
  withNotes: 88,
  actionItemCompletion: 76,
  byType: {
    regular: 78,
    career: 15,
    feedback: 18,
    checkin: 13
  }
};

// 성장 활동
export const growthActivities = {
  learningHours: 342, // 총 학습 시간 (이번 분기)
  avgPerPerson: 5.1,
  completedCourses: 45,
  certifications: 8,
  techTalks: 12,
  studyGroups: 6,
  mentorships: 15
};

// 최근 하이라이트
export const recentHighlights = [
  {
    id: 'highlight-1',
    type: 'achievement',
    title: '커머스 AI 코어 스쿼드 Q1 OKR 100% 달성',
    description: '전체 목표를 기한 내 완료하며 뛰어난 실행력 입증',
    date: '2025-03-31',
    squad: '커머스 AI 코어 스쿼드',
    impact: 'high'
  },
  {
    id: 'highlight-2',
    type: 'milestone',
    title: '디자인 시스템 2.0 출시',
    description: '프로덕트 디자인 챕터의 6개월 프로젝트 완료',
    date: '2025-03-15',
    chapter: '프로덕트 디자인',
    impact: 'high'
  },
  {
    id: 'highlight-3',
    type: 'growth',
    title: '3명 L4로 승진',
    description: '뛰어난 성과와 리더십 역량 인정',
    date: '2025-03-01',
    impact: 'medium'
  },
  {
    id: 'highlight-4',
    type: 'learning',
    title: '아키텍처 스터디 그룹 10주 완료',
    description: '15명이 참여한 시스템 디자인 스터디 성공적 종료',
    date: '2025-02-28',
    chapter: '백엔드',
    impact: 'medium'
  },
  {
    id: 'highlight-5',
    type: 'feedback',
    title: '분기 피드백 완료율 95% 달성',
    description: '전사 피드백 문화 정착',
    date: '2025-02-15',
    impact: 'medium'
  }
];

// 주의 필요 사항
export const attentionNeeded = [
  {
    id: 'attention-1',
    priority: 'high',
    category: 'okr',
    title: 'Growth 스쿼드 OKR 진행률 저조',
    description: 'Q1 목표 대비 45% 진행. 리소스 조정 또는 목표 재설정 필요',
    affectedTeam: 'Growth 스쿼드',
    dueDate: '2025-03-31'
  },
  {
    id: 'attention-2',
    priority: 'high',
    category: 'tech-debt',
    title: '백엔드 챕터 기술 부채 증가',
    description: '레거시 코드 비율 증가. 리팩토링 계획 수립 필요',
    affectedTeam: '백엔드',
    dueDate: '2025-04-30'
  },
  {
    id: 'attention-3',
    priority: 'medium',
    category: 'feedback',
    title: '피드백 미완료 47건',
    description: '분기 마감 전 완료 필요',
    dueDate: '2025-03-31'
  },
  {
    id: 'attention-4',
    priority: 'medium',
    category: 'meeting',
    title: '액션 아이템 완료율 76%',
    description: '1:1 미팅 후속 조치 추적 강화 필요',
    dueDate: '2025-04-15'
  }
];

// 인력 현황
export const headcountTrends = {
  labels: ['2024-Q2', '2024-Q3', '2024-Q4', '2025-Q1'],
  data: {
    total: [52, 58, 63, 67],
    engineering: [38, 42, 46, 49],
    design: [6, 7, 8, 8],
    product: [3, 3, 3, 4],
    data: [5, 6, 6, 6]
  }
};

// 역량 트렌드
export const competencyTrends = {
  labels: ['2024-Q2', '2024-Q3', '2024-Q4', '2025-Q1'],
  data: {
    technical: [3.8, 3.9, 4.0, 4.1],
    collaboration: [4.0, 4.1, 4.2, 4.3],
    leadership: [3.5, 3.6, 3.7, 3.9],
    delivery: [3.9, 4.0, 4.1, 4.2],
    growth: [3.7, 3.8, 3.9, 4.0]
  }
};
