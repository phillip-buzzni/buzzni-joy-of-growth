// Job Matrix: L1-L10 레벨 시스템
// 버즈니 10단계 직급 체계

export const jobLevels = [
  {
    id: 'L1',
    level: 1,
    name: 'Entry',
    nameKorean: '신입',
    color: 'gray',
    yearsOfExperience: '0-1년',
    description: '기본적인 업무를 수행하며 조직에 적응하는 단계',
    responsibilities: [
      '지정된 작업을 완수하고 기본적인 도구와 프로세스를 학습',
      '팀원의 가이드를 받아 업무 수행',
      '코드 리뷰를 통해 피드백을 받고 개선',
      '기술 문서를 읽고 이해하며 학습'
    ],
    technicalSkills: [
      '기본적인 프로그래밍 언어 이해',
      '버전 관리 시스템(Git) 기초 사용',
      '간단한 기능 구현 및 버그 수정',
      '팀의 코딩 스타일 및 컨벤션 준수'
    ],
    leadershipSkills: [
      '팀 문화와 프로세스 이해 및 적응',
      '적극적으로 질문하고 학습하는 자세',
      '피드백을 받아들이고 개선하는 태도'
    ]
  },
  {
    id: 'L2',
    level: 2,
    name: 'Junior',
    nameKorean: '주니어',
    color: 'blue',
    yearsOfExperience: '1-2년',
    description: '독립적으로 간단한 업무를 수행할 수 있는 단계',
    responsibilities: [
      '명확하게 정의된 작업을 독립적으로 완수',
      '간단한 기능 개발 및 버그 수정을 주도',
      '코드 품질 향상을 위해 노력',
      '팀 내 지식 공유에 참여'
    ],
    technicalSkills: [
      '하나 이상의 프로그래밍 언어에 능숙',
      '기본적인 알고리즘과 자료구조 이해',
      '테스트 코드 작성 능력',
      '디버깅 및 문제 해결 능력'
    ],
    leadershipSkills: [
      '팀원과 효과적으로 협업',
      '자신의 진행 상황을 명확히 공유',
      '문제 발생 시 적절히 에스컬레이션'
    ]
  },
  {
    id: 'L3',
    level: 3,
    name: 'Intermediate',
    nameKorean: '중급',
    color: 'green',
    yearsOfExperience: '2-4년',
    description: '복잡한 문제를 독립적으로 해결할 수 있는 단계',
    responsibilities: [
      '중간 규모의 기능을 설계하고 구현',
      '코드 리뷰를 통해 주니어 개발자 멘토링',
      '기술 부채를 식별하고 개선 제안',
      '프로젝트의 일정과 범위 관리에 기여'
    ],
    technicalSkills: [
      '시스템 아키텍처에 대한 이해',
      '성능 최적화 및 리팩토링 능력',
      '여러 기술 스택에 대한 폭넓은 이해',
      '보안 및 확장성을 고려한 설계'
    ],
    leadershipSkills: [
      '후배 개발자에게 기술적 가이드 제공',
      '팀 내 기술 토론에 적극 참여',
      '프로젝트 우선순위 결정에 의견 제시'
    ]
  },
  {
    id: 'L4',
    level: 4,
    name: 'Senior',
    nameKorean: '시니어',
    color: 'purple',
    yearsOfExperience: '4-6년',
    description: '팀의 기술적 방향성을 제시하고 리드할 수 있는 단계',
    responsibilities: [
      '복잡한 시스템 설계 및 아키텍처 결정',
      '여러 프로젝트를 동시에 리드',
      '기술 표준 및 베스트 프랙티스 수립',
      '주니어/중급 개발자 멘토링'
    ],
    technicalSkills: [
      '깊이 있는 기술 전문성',
      '시스템 전체의 트레이드오프 이해',
      '새로운 기술 도입 및 평가',
      '레거시 시스템 마이그레이션 경험'
    ],
    leadershipSkills: [
      '기술적 의사결정에 대한 책임',
      '팀원의 성장을 돕는 멘토십',
      '부서 간 협업 및 커뮤니케이션'
    ]
  },
  {
    id: 'L5',
    level: 5,
    name: 'Staff Engineer',
    nameKorean: '스태프 엔지니어',
    color: 'indigo',
    yearsOfExperience: '6-8년',
    description: '여러 팀에 걸쳐 영향력을 발휘하는 단계',
    responsibilities: [
      '여러 팀에 걸친 기술 전략 수립',
      '회사 차원의 기술 과제 해결',
      '기술 로드맵 작성 및 실행',
      '엔지니어링 문화 개선 주도'
    ],
    technicalSkills: [
      '여러 도메인에 대한 깊은 이해',
      '대규모 시스템 설계 및 운영 경험',
      '기술 부채 관리 전략 수립',
      '신기술 도입 시 리스크 평가'
    ],
    leadershipSkills: [
      '조직 전체에 기술적 영향력 행사',
      '크로스팀 협업 주도',
      '기술 비전 제시 및 공유',
      '주니어부터 시니어까지 멘토링'
    ]
  },
  {
    id: 'L6',
    level: 6,
    name: 'Senior Staff Engineer',
    nameKorean: '시니어 스태프 엔지니어',
    color: 'pink',
    yearsOfExperience: '8-10년',
    description: '조직의 기술 전략을 주도하는 단계',
    responsibilities: [
      '전사 기술 아키텍처 정의 및 개선',
      '핵심 기술 의사결정 주도',
      '엔지니어링 생산성 향상 이니셔티브',
      '외부 기술 커뮤니티에서 회사 대표'
    ],
    technicalSkills: [
      '비즈니스 목표와 기술 전략 연계',
      '복잡한 시스템 간 통합 설계',
      '기술 부채 vs 신규 기능 우선순위 결정',
      '엔지니어링 메트릭 정의 및 측정'
    ],
    leadershipSkills: [
      '여러 팀의 기술 방향성 조율',
      '엔지니어링 리더 멘토링',
      '기술 조직 성장 전략 수립',
      '경영진과 기술 커뮤니케이션'
    ]
  },
  {
    id: 'L7',
    level: 7,
    name: 'Principal Engineer',
    nameKorean: '프린시펄 엔지니어',
    color: 'red',
    yearsOfExperience: '10-12년',
    description: '회사의 기술적 비전을 정의하고 실행하는 단계',
    responsibilities: [
      '회사 차원의 기술 비전 수립',
      '핵심 플랫폼 및 인프라 전략 주도',
      '기술 혁신 및 연구개발 리드',
      '인더스트리 리더로서 영향력 발휘'
    ],
    technicalSkills: [
      '비즈니스 전략과 기술 전략의 완벽한 정렬',
      '장기적 기술 로드맵 수립',
      '기술적 위기 상황 해결',
      '새로운 기술 패러다임 주도'
    ],
    leadershipSkills: [
      '전사 기술 조직 리더십',
      'C-level과 기술 전략 논의',
      '업계 표준 및 트렌드 선도',
      '조직 전체의 기술 역량 강화'
    ]
  },
  {
    id: 'L8',
    level: 8,
    name: 'Distinguished Engineer',
    nameKorean: '디스팅귀시드 엔지니어',
    color: 'orange',
    yearsOfExperience: '12-15년',
    description: '업계 최고 수준의 기술 전문가',
    responsibilities: [
      '회사의 기술 경쟁력 확보',
      '글로벌 기술 트렌드 분석 및 적용',
      '혁신적 기술 도입 및 연구',
      '기술 브랜드 구축 및 인재 영입'
    ],
    technicalSkills: [
      '업계를 선도하는 기술 전문성',
      '전략적 기술 의사결정',
      '복잡한 비즈니스 문제의 기술적 해결',
      '기술 특허 및 논문 발표'
    ],
    leadershipSkills: [
      '경영진 의사결정 지원',
      '전사 기술 문화 정의',
      '글로벌 기술 커뮤니티 리더십',
      '차세대 기술 리더 양성'
    ]
  },
  {
    id: 'L9',
    level: 9,
    name: 'Fellow',
    nameKorean: '펠로우',
    color: 'yellow',
    yearsOfExperience: '15년+',
    description: '회사와 업계를 대표하는 최고 기술 전문가',
    responsibilities: [
      '회사의 장기 기술 비전 수립',
      '산업 전체에 영향을 미치는 기술 혁신',
      '글로벌 기술 리더로서 활동',
      '차세대 기술 생태계 구축'
    ],
    technicalSkills: [
      '업계를 변화시키는 기술 혁신',
      '비즈니스 모델 혁신을 위한 기술 전략',
      '글로벌 기술 표준 제정 참여',
      '근본적 문제 해결 및 새로운 패러다임 제시'
    ],
    leadershipSkills: [
      'CEO 및 이사회와 기술 전략 수립',
      '회사 기술 브랜드의 얼굴',
      '업계 기술 리더 네트워크 구축',
      '기술 조직의 미래 비전 제시'
    ]
  },
  {
    id: 'L10',
    level: 10,
    name: 'Senior Fellow / CTO',
    nameKorean: '시니어 펠로우 / CTO',
    color: 'emerald',
    yearsOfExperience: '20년+',
    description: '기술과 비즈니스를 통합하는 최고 리더',
    responsibilities: [
      '전사 기술 및 제품 전략 총괄',
      '비즈니스 성장을 위한 기술 혁신 주도',
      '글로벌 기술 생태계에서 회사 위상 확립',
      '미래 기술 트렌드 예측 및 대응'
    ],
    technicalSkills: [
      '기술과 비즈니스의 완벽한 통합',
      '산업을 재정의하는 기술 혁신',
      '글로벌 기술 트렌드 선도',
      '회사의 핵심 경쟁력 정의'
    ],
    leadershipSkills: [
      '경영진으로서 회사 전략 수립 참여',
      '기술 조직 전체 리더십',
      '산업 및 정부 차원의 기술 정책 자문',
      '차세대 기술 리더 육성 체계 구축'
    ]
  }
];

// 레벨별 색상 매핑
export const levelColors = {
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-700',
    hover: 'hover:shadow-md hover:border-gray-400'
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    hover: 'hover:shadow-md hover:border-blue-400'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    hover: 'hover:shadow-md hover:border-green-400'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-700',
    hover: 'hover:shadow-md hover:border-purple-400'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-300',
    text: 'text-indigo-700',
    hover: 'hover:shadow-md hover:border-indigo-400'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    text: 'text-pink-700',
    hover: 'hover:shadow-md hover:border-pink-400'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    hover: 'hover:shadow-md hover:border-red-400'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    hover: 'hover:shadow-md hover:border-orange-400'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    hover: 'hover:shadow-md hover:border-yellow-400'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-700',
    hover: 'hover:shadow-md hover:border-emerald-400'
  }
};
