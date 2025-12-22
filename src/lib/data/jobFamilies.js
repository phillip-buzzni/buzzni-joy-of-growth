// 버즈니 직군(Job Family) 정의
// 챕터를 기반으로 직군을 분류

export const jobFamilies = {
  engineering: {
    id: 'engineering',
    name: 'Engineering',
    nameKorean: '엔지니어링',
    icon: '💻',
    color: 'blue',
    chapters: [
      '프론트엔드 엔지니어링',
      '백엔드 엔지니어링',
      '서비스 백엔드 엔지니어링',
      '커머스플랫폼 백엔드 엔지니어링',
      '클라이언트 엔지니어',
      '데이터 엔지니어링'
    ]
  },
  data: {
    id: 'data',
    name: 'Data & AI',
    nameKorean: '데이터 & AI',
    icon: '🤖',
    color: 'purple',
    chapters: [
      '데이터 분석'
    ]
  },
  product: {
    id: 'product',
    name: 'Product',
    nameKorean: '프로덕트',
    icon: '🎯',
    color: 'green',
    chapters: [
      '프로덕트 매니지먼트',
      'QA'
    ]
  },
  design: {
    id: 'design',
    name: 'Design',
    nameKorean: '디자인',
    icon: '🎨',
    color: 'pink',
    chapters: [
      '프로덕트 디자인'
    ]
  },
  business: {
    id: 'business',
    name: 'Business',
    nameKorean: '비즈니스',
    icon: '💼',
    color: 'orange',
    chapters: [
      '비즈니스 매니지먼트',
      '오퍼레이션 매니지먼트',
      'MD',
      '세일즈매니저'
    ]
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    nameKorean: '마케팅',
    icon: '📢',
    color: 'yellow',
    chapters: [
      '마케팅',
      '홍보',
      '영상 PD'
    ]
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate',
    nameKorean: '경영 지원',
    icon: '🏢',
    color: 'gray',
    chapters: [
      '경영진',
      '경영 지원',
      '피플'
    ]
  }
};

// 챕터명으로 직군 찾기
export function getJobFamilyByChapter(chapterName) {
  for (const [key, family] of Object.entries(jobFamilies)) {
    if (family.chapters.includes(chapterName)) {
      return family;
    }
  }
  return jobFamilies.corporate; // 기본값
}

// 직군별 색상
export const jobFamilyColors = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    hover: 'hover:bg-blue-100'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-700',
    hover: 'hover:bg-purple-100'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    hover: 'hover:bg-green-100'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    text: 'text-pink-700',
    hover: 'hover:bg-pink-100'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    hover: 'hover:bg-orange-100'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    hover: 'hover:bg-yellow-100'
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-700',
    hover: 'hover:bg-gray-100'
  }
};
