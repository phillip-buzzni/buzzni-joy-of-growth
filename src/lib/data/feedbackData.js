// 360도 피드백 데이터 구조

// 피드백 사이클 (분기별 진행)
export const feedbackCycles = [
  {
    id: '2025-q1',
    name: '2025 Q1 피드백',
    startDate: '2025-01-15',
    endDate: '2025-02-15',
    status: 'active' // active, completed, upcoming
  },
  {
    id: '2024-q4',
    name: '2024 Q4 피드백',
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    status: 'completed'
  }
];

// 피드백 유형
export const feedbackTypes = {
  upward: { name: '상향 피드백', icon: '⬆️', description: '팀원 → 리더' },
  downward: { name: '하향 피드백', icon: '⬇️', description: '리더 → 팀원' },
  peer: { name: '동료 피드백', icon: '↔️', description: '동료 → 동료' },
  self: { name: '자기 평가', icon: '🔄', description: '본인 → 본인' }
};

// 피드백 카테고리
export const feedbackCategories = [
  {
    id: 'technical',
    name: '기술 역량',
    icon: '💻',
    questions: [
      '기술적 문제 해결 능력이 뛰어나다',
      '새로운 기술을 빠르게 학습하고 적용한다',
      '코드 품질과 아키텍처 설계가 우수하다'
    ]
  },
  {
    id: 'collaboration',
    name: '협업 및 커뮤니케이션',
    icon: '🤝',
    questions: [
      '팀원들과 원활하게 소통한다',
      '다른 팀과 협업을 잘한다',
      '건설적인 피드백을 주고받는다'
    ]
  },
  {
    id: 'leadership',
    name: '리더십',
    icon: '🎯',
    questions: [
      '팀의 방향을 제시하고 이끈다',
      '후배 육성에 적극적이다',
      '어려운 결정을 내릴 수 있다'
    ]
  },
  {
    id: 'delivery',
    name: '업무 실행력',
    icon: '🚀',
    questions: [
      '목표를 명확히 이해하고 달성한다',
      '일정을 준수하며 책임감이 강하다',
      '품질과 속도의 균형을 잘 맞춘다'
    ]
  },
  {
    id: 'growth',
    name: '성장 마인드셋',
    icon: '📈',
    questions: [
      '실수에서 배우고 개선한다',
      '피드백을 긍정적으로 수용한다',
      '지속적으로 성장하려는 의지가 있다'
    ]
  }
];

// 샘플 피드백 요청 데이터
export const sampleFeedbackRequests = [
  {
    id: 'req-1',
    cycleId: '2025-q1',
    requesterId: '100925427819464696032', // peter
    targetId: '103598657260934052246', // justin
    type: 'peer',
    status: 'pending', // pending, completed, declined
    requestedAt: '2025-01-20',
    dueDate: '2025-02-10',
    isAnonymous: false
  },
  {
    id: 'req-2',
    cycleId: '2025-q1',
    requesterId: '103598657260934052246', // justin
    targetId: '114684699230788515528', // 티거
    type: 'downward',
    status: 'completed',
    requestedAt: '2025-01-18',
    completedAt: '2025-01-25',
    dueDate: '2025-02-10',
    isAnonymous: false
  },
  {
    id: 'req-3',
    cycleId: '2025-q1',
    requesterId: '114684699230788515528', // 티거
    targetId: '103598657260934052246', // justin
    type: 'upward',
    status: 'completed',
    requestedAt: '2025-01-18',
    completedAt: '2025-01-26',
    dueDate: '2025-02-10',
    isAnonymous: true
  },
  {
    id: 'req-4',
    cycleId: '2025-q1',
    requesterId: '117419763454154203072', // 이리나
    targetId: '112898034646352131716', // 안나
    type: 'peer',
    status: 'pending',
    requestedAt: '2025-01-22',
    dueDate: '2025-02-10',
    isAnonymous: false
  },
  {
    id: 'req-5',
    cycleId: '2025-q1',
    requesterId: '112898034646352131716', // 안나
    targetId: '117419763454154203072', // 이리나
    type: 'peer',
    status: 'pending',
    requestedAt: '2025-01-22',
    dueDate: '2025-02-10',
    isAnonymous: false
  }
];

// 샘플 피드백 응답 데이터
export const sampleFeedbackResponses = [
  {
    id: 'res-1',
    requestId: 'req-2',
    cycleId: '2025-q1',
    giverId: '103598657260934052246', // justin
    receiverId: '114684699230788515528', // 티거
    type: 'downward',
    isAnonymous: false,
    submittedAt: '2025-01-25',
    ratings: [
      { categoryId: 'technical', score: 4, comment: '기술적 역량이 뛰어나고 빠르게 학습합니다.' },
      { categoryId: 'collaboration', score: 5, comment: '팀원들과 적극적으로 소통하고 협업합니다.' },
      { categoryId: 'delivery', score: 4, comment: '일정 준수를 잘하며 책임감이 강합니다.' },
      { categoryId: 'growth', score: 5, comment: '피드백을 긍정적으로 받아들이고 빠르게 개선합니다.' }
    ],
    strengths: '백엔드 API 설계와 성능 최적화에 강점이 있습니다. 문제 상황에서도 침착하게 해결책을 찾아냅니다.',
    improvements: '때때로 완벽주의 성향이 강해 일정에 영향을 줄 때가 있습니다. 적절한 타협점을 찾는 연습이 필요합니다.',
    overall: '전반적으로 매우 우수한 팀원입니다. 앞으로의 성장이 기대됩니다.'
  },
  {
    id: 'res-2',
    requestId: 'req-3',
    cycleId: '2025-q1',
    giverId: '114684699230788515528', // 티거
    receiverId: '103598657260934052246', // justin
    type: 'upward',
    isAnonymous: true,
    submittedAt: '2025-01-26',
    ratings: [
      { categoryId: 'leadership', score: 5, comment: '명확한 비전을 제시하고 팀을 이끕니다.' },
      { categoryId: 'collaboration', score: 4, comment: '팀원의 의견을 경청하고 존중합니다.' },
      { categoryId: 'technical', score: 5, comment: '기술적 방향성을 제시하는 능력이 뛰어납니다.' },
      { categoryId: 'growth', score: 4, comment: '팀원들의 성장을 위해 적극적으로 지원합니다.' }
    ],
    strengths: '리더로서 팀의 방향을 명확히 제시하고, 기술적으로도 탁월합니다. 팀원들을 믿고 권한을 위임하는 모습이 인상적입니다.',
    improvements: '가끔 빠른 의사결정으로 인해 팀원들의 의견을 충분히 듣지 못할 때가 있습니다.',
    overall: '훌륭한 리더입니다. 함께 일하며 많은 것을 배우고 있습니다.'
  }
];

// 피드백 상태별 색상
export const feedbackStatusColors = {
  pending: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  completed: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800'
  },
  declined: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800'
  }
};

// 상태별 한글명
export const statusLabels = {
  pending: '대기 중',
  completed: '완료',
  declined: '거절됨'
};

// 평점 척도
export const ratingScale = [
  { value: 1, label: '개선 필요', color: 'text-red-600' },
  { value: 2, label: '부족함', color: 'text-orange-600' },
  { value: 3, label: '보통', color: 'text-yellow-600' },
  { value: 4, label: '우수함', color: 'text-blue-600' },
  { value: 5, label: '탁월함', color: 'text-green-600' }
];
