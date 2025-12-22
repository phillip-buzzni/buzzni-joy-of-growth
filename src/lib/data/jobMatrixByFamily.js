// 직군별 Job Matrix 정의
// 각 직군마다 레벨별 역량이 다르게 정의됨

import { jobLevels } from './jobMatrix.js';

// 엔지니어링 직군의 역량 카테고리
export const engineeringCompetencies = [
  {
    id: 'technical',
    name: '기술 전문성',
    icon: '💻',
    color: 'bg-blue-50',
    getDescription: (level) => {
      const descriptions = {
        1: '기본적인 프로그래밍 언어 이해, Git 기초 사용',
        2: '하나 이상의 언어에 능숙, 알고리즘과 자료구조 이해',
        3: '시스템 아키텍처 이해, 성능 최적화 및 리팩토링',
        4: '깊이 있는 기술 전문성, 시스템 전체의 트레이드오프 이해',
        5: '여러 도메인에 대한 깊은 이해, 대규모 시스템 설계',
        6: '전사 기술 아키텍처 정의, 복잡한 시스템 간 통합 설계',
        7: '비즈니스 전략과 기술 전략의 완벽한 정렬',
        8: '업계를 선도하는 기술 전문성, 전략적 기술 의사결정',
        9: '업계를 변화시키는 기술 혁신',
        10: '산업을 재정의하는 기술 혁신, 글로벌 기술 트렌드 선도'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'codeQuality',
    name: '코드 품질',
    icon: '✨',
    color: 'bg-green-50',
    getDescription: (level) => {
      const descriptions = {
        1: '팀의 코딩 스타일 및 컨벤션 준수',
        2: '테스트 코드 작성, 코드 리뷰 참여',
        3: '코드 리뷰를 통해 주니어 개발자 멘토링',
        4: '기술 표준 및 베스트 프랙티스 수립',
        5: '기술 부채 관리 전략 수립',
        6: '엔지니어링 생산성 향상 이니셔티브',
        7: '기술 혁신 및 연구개발 리드',
        8: '혁신적 기술 도입 및 연구',
        9: '근본적 문제 해결 및 새로운 패러다임 제시',
        10: '회사의 핵심 경쟁력 정의'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'problemSolving',
    name: '문제 해결',
    icon: '🔍',
    color: 'bg-purple-50',
    getDescription: (level) => {
      const descriptions = {
        1: '간단한 기능 구현 및 버그 수정',
        2: '명확하게 정의된 작업을 독립적으로 완수',
        3: '중간 규모의 기능을 설계하고 구현',
        4: '복잡한 시스템 설계 및 아키텍처 결정',
        5: '회사 차원의 기술 과제 해결',
        6: '핵심 기술 의사결정 주도',
        7: '핵심 플랫폼 및 인프라 전략 주도',
        8: '복잡한 비즈니스 문제의 기술적 해결',
        9: '산업 전체에 영향을 미치는 기술 혁신',
        10: '비즈니스 성장을 위한 기술 혁신 주도'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'collaboration',
    name: '협업 & 커뮤니케이션',
    icon: '🤝',
    color: 'bg-yellow-50',
    getDescription: (level) => {
      const descriptions = {
        1: '팀원과 협업, 적극적으로 질문하고 학습',
        2: '진행 상황 명확히 공유, 문제 발생 시 에스컬레이션',
        3: '팀 내 기술 토론에 적극 참여',
        4: '기술적 의사결정에 대한 책임, 부서 간 협업',
        5: '조직 전체에 기술적 영향력 행사, 크로스팀 협업 주도',
        6: '여러 팀의 기술 방향성 조율, 엔지니어링 리더 멘토링',
        7: '전사 기술 조직 리더십, C-level과 기술 전략 논의',
        8: '경영진 의사결정 지원, 전사 기술 문화 정의',
        9: 'CEO 및 이사회와 기술 전략 수립',
        10: '경영진으로서 회사 전략 수립 참여'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'impact',
    name: '영향력 범위',
    icon: '🎯',
    color: 'bg-orange-50',
    getDescription: (level) => {
      const descriptions = {
        1: '개인 업무 (지정된 작업)',
        2: '개인 업무 (독립적 작업)',
        3: '팀 내 프로젝트',
        4: '여러 프로젝트, 팀 기술 방향성',
        5: '여러 팀에 걸친 기술 전략',
        6: '전사 기술 아키텍처',
        7: '회사 차원의 기술 비전',
        8: '회사의 기술 경쟁력',
        9: '회사의 장기 기술 비전, 산업 전체 영향',
        10: '전사 기술 및 제품 전략 총괄'
      };
      return descriptions[level.level] || '-';
    }
  }
];

// 프로덕트 직군의 역량 카테고리
export const productCompetencies = [
  {
    id: 'productStrategy',
    name: '제품 전략',
    icon: '🎯',
    color: 'bg-blue-50',
    getDescription: (level) => {
      const descriptions = {
        1: '제품 요구사항 이해 및 학습',
        2: '명확한 제품 기능 정의 및 문서화',
        3: '제품 로드맵 기여, 우선순위 결정 참여',
        4: '제품 전략 수립, 여러 제품 라인 관리',
        5: '회사 차원의 제품 비전 수립',
        6: '전사 제품 포트폴리오 전략',
        7: '비즈니스 목표와 제품 전략 통합',
        8: '시장을 선도하는 제품 혁신',
        9: '산업을 변화시키는 제품 비전',
        10: '전사 제품 및 비즈니스 전략 총괄'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'userResearch',
    name: '사용자 리서치',
    icon: '🔍',
    color: 'bg-green-50',
    getDescription: (level) => {
      const descriptions = {
        1: '사용자 피드백 수집 및 정리',
        2: '사용자 인터뷰 및 데이터 분석',
        3: '사용자 페르소나 및 저니 맵 작성',
        4: '정량/정성 리서치 설계 및 실행',
        5: '조직 전체의 사용자 중심 문화 구축',
        6: '전사 사용자 경험 전략 수립',
        7: '시장 트렌드 분석 및 예측',
        8: '산업 인사이트 기반 제품 혁신',
        9: '글로벌 시장 트렌드 선도',
        10: '미래 시장 트렌드 예측 및 대응'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'execution',
    name: '실행력',
    icon: '⚡',
    color: 'bg-purple-50',
    getDescription: (level) => {
      const descriptions = {
        1: '간단한 제품 스펙 작성',
        2: '제품 기능 출시 및 모니터링',
        3: '프로젝트 일정 및 리소스 관리',
        4: '복잡한 프로젝트 리드 및 조율',
        5: '여러 팀 간 제품 이니셔티브 조율',
        6: '전사 제품 출시 프로세스 최적화',
        7: '제품 조직 효율성 극대화',
        8: '전사 제품 개발 프로세스 혁신',
        9: '산업 표준 제품 프로세스 정립',
        10: '글로벌 제품 조직 리더십'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'dataAnalysis',
    name: '데이터 분석',
    icon: '📊',
    color: 'bg-yellow-50',
    getDescription: (level) => {
      const descriptions = {
        1: '기본 지표 이해 및 모니터링',
        2: '제품 지표 분석 및 리포팅',
        3: 'A/B 테스트 설계 및 분석',
        4: '데이터 기반 의사결정 프레임워크 구축',
        5: '조직 전체의 데이터 문화 구축',
        6: '전사 지표 체계 수립 및 관리',
        7: '데이터 전략과 비즈니스 목표 통합',
        8: '예측 모델 기반 전략 수립',
        9: 'AI/ML 기반 제품 혁신',
        10: '데이터 기반 비즈니스 모델 혁신'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'stakeholder',
    name: '이해관계자 관리',
    icon: '🤝',
    color: 'bg-orange-50',
    getDescription: (level) => {
      const descriptions = {
        1: '팀 내 커뮤니케이션',
        2: '크로스팀 협업 및 조율',
        3: '여러 팀과 효과적인 협업',
        4: '부서 간 이해관계 조율',
        5: '경영진과 제품 전략 커뮤니케이션',
        6: 'C-level과 제품 비전 공유',
        7: '이사회 및 투자자 커뮤니케이션',
        8: '외부 파트너십 및 제휴 주도',
        9: '산업 리더 네트워크 구축',
        10: '글로벌 파트너십 전략 수립'
      };
      return descriptions[level.level] || '-';
    }
  }
];

// 디자인 직군의 역량 카테고리
export const designCompetencies = [
  {
    id: 'visualDesign',
    name: '비주얼 디자인',
    icon: '🎨',
    color: 'bg-pink-50',
    getDescription: (level) => {
      const descriptions = {
        1: '디자인 가이드라인 이해 및 적용',
        2: '일관된 UI 컴포넌트 디자인',
        3: '디자인 시스템 구축 및 관리',
        4: '브랜드 아이덴티티 정립',
        5: '전사 디자인 언어 체계 수립',
        6: '디자인 시스템 전략 및 진화',
        7: '브랜드 경험 전략 수립',
        8: '혁신적인 디자인 방법론 도입',
        9: '산업을 선도하는 디자인 트렌드 창출',
        10: '글로벌 브랜드 디자인 전략'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'uxDesign',
    name: 'UX 디자인',
    icon: '📱',
    color: 'bg-blue-50',
    getDescription: (level) => {
      const descriptions = {
        1: '기본 사용자 플로우 이해',
        2: '사용성 테스트 및 개선',
        3: '복잡한 사용자 경험 설계',
        4: 'UX 전략 수립 및 실행',
        5: '조직 전체의 UX 문화 구축',
        6: '전사 사용자 경험 표준 수립',
        7: '비즈니스 목표와 UX 전략 통합',
        8: '혁신적인 사용자 경험 창출',
        9: '산업 표준 UX 패턴 정립',
        10: '미래 사용자 경험 트렌드 선도'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'prototyping',
    name: '프로토타이핑',
    icon: '⚡',
    color: 'bg-green-50',
    getDescription: (level) => {
      const descriptions = {
        1: '기본 프로토타입 제작',
        2: '인터랙티브 프로토타입 제작',
        3: '고도화된 프로토타입 및 검증',
        4: '프로토타이핑 프로세스 최적화',
        5: '디자인 기술 스택 선정 및 도입',
        6: '디자인 도구 및 워크플로우 혁신',
        7: '디자인-개발 협업 프로세스 혁신',
        8: '디자인 자동화 및 AI 활용',
        9: '차세대 디자인 도구 개발',
        10: '디자인 기술 생태계 구축'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'research',
    name: '리서치',
    icon: '🔍',
    color: 'bg-purple-50',
    getDescription: (level) => {
      const descriptions = {
        1: '사용자 피드백 수집',
        2: '정성 리서치 수행',
        3: '정량/정성 리서치 통합 분석',
        4: '리서치 전략 수립',
        5: '데이터 기반 디자인 의사결정 문화',
        6: '전사 디자인 리서치 체계 구축',
        7: '비즈니스 인사이트 도출',
        8: '시장 트렌드 예측 및 대응',
        9: '산업 인사이트 리더십',
        10: '글로벌 트렌드 분석 및 전략 수립'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'leadership',
    name: '디자인 리더십',
    icon: '👥',
    color: 'bg-orange-50',
    getDescription: (level) => {
      const descriptions = {
        1: '팀 협업 및 커뮤니케이션',
        2: '프로젝트 단위 협업 리드',
        3: '주니어 디자이너 멘토링',
        4: '디자인 팀 리드 및 방향성 제시',
        5: '여러 디자인 팀 조율',
        6: '전사 디자인 조직 리더십',
        7: '디자인 조직 문화 및 프로세스 정립',
        8: '디자인 인재 육성 체계 구축',
        9: '산업 디자인 커뮤니티 리더십',
        10: '글로벌 디자인 조직 전략'
      };
      return descriptions[level.level] || '-';
    }
  }
];

// 비즈니스 직군의 역량 카테고리
export const businessCompetencies = [
  {
    id: 'strategy',
    name: '비즈니스 전략',
    icon: '💼',
    color: 'bg-blue-50',
    getDescription: (level) => {
      const descriptions = {
        1: '비즈니스 목표 및 KPI 이해',
        2: '프로젝트 단위 목표 수립 및 달성',
        3: '분기/반기 전략 수립 및 실행',
        4: '사업 부문 전략 수립',
        5: '여러 사업 부문 통합 전략',
        6: '전사 비즈니스 전략 수립',
        7: '중장기 성장 전략 및 로드맵',
        8: '신규 사업 기회 발굴 및 실행',
        9: 'M&A 및 파트너십 전략',
        10: '글로벌 확장 및 시장 진입 전략'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'analysis',
    name: '데이터 분석',
    icon: '📊',
    color: 'bg-green-50',
    getDescription: (level) => {
      const descriptions = {
        1: '기본 데이터 수집 및 정리',
        2: '비즈니스 지표 분석 및 리포팅',
        3: '심화 분석 및 인사이트 도출',
        4: '데이터 기반 의사결정 프레임워크',
        5: '예측 모델 및 시뮬레이션',
        6: '전사 분석 체계 및 지표 관리',
        7: '비즈니스 인텔리전스 전략',
        8: '고급 분석 및 AI 활용',
        9: '데이터 기반 비즈니스 모델 혁신',
        10: '전사 데이터 전략 및 거버넌스'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'execution',
    name: '실행력',
    icon: '⚡',
    color: 'bg-purple-50',
    getDescription: (level) => {
      const descriptions = {
        1: '주어진 업무 완수',
        2: '프로젝트 독립적 수행',
        3: '복잡한 프로젝트 리드',
        4: '여러 프로젝트 동시 관리',
        5: '크로스팀 이니셔티브 주도',
        6: '전사 주요 프로그램 리드',
        7: '전략적 이니셔티브 실행',
        8: '조직 변화 관리 및 혁신',
        9: '대규모 트랜스포메이션 주도',
        10: '전사 운영 효율성 극대화'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'partnership',
    name: '파트너십',
    icon: '🤝',
    color: 'bg-yellow-50',
    getDescription: (level) => {
      const descriptions = {
        1: '파트너 커뮤니케이션 지원',
        2: '파트너 관계 관리',
        3: '신규 파트너 발굴 및 계약',
        4: '전략적 파트너십 구축',
        5: '파트너 생태계 관리',
        6: '전사 파트너십 전략',
        7: '글로벌 파트너십 확대',
        8: '산업 연합 및 컨소시엄',
        9: '전략적 제휴 및 조인트벤처',
        10: '글로벌 파트너십 포트폴리오 관리'
      };
      return descriptions[level.level] || '-';
    }
  },
  {
    id: 'leadership',
    name: '리더십',
    icon: '👥',
    color: 'bg-orange-50',
    getDescription: (level) => {
      const descriptions = {
        1: '팀 협업',
        2: '프로젝트 리드',
        3: '주니어 멘토링',
        4: '팀 리드',
        5: '여러 팀 조율',
        6: '부서 리더십',
        7: '조직 문화 구축',
        8: '임원 리더십',
        9: '경영진 리더십',
        10: 'C-level 리더십'
      };
      return descriptions[level.level] || '-';
    }
  }
];

// 마케팅 직군의 역량 카테고리
export const marketingCompetencies = businessCompetencies;

// 경영지원 직군의 역량 카테고리
export const corporateCompetencies = businessCompetencies;

// 직군별 역량 매핑
export const competenciesByFamily = {
  engineering: engineeringCompetencies,
  data: engineeringCompetencies,
  product: productCompetencies,
  design: designCompetencies,
  business: businessCompetencies,
  marketing: marketingCompetencies,
  corporate: corporateCompetencies
};
