// 1:1 미팅 관리 데이터

import mockUsers from './mockUsers.json';

// 미팅 상태
export const meetingStatus = {
  scheduled: { name: '예정됨', color: 'blue' },
  completed: { name: '완료', color: 'green' },
  cancelled: { name: '취소됨', color: 'gray' }
};

// 미팅 유형
export const meetingTypes = {
  regular: { name: '정기 1:1', icon: '🔄', description: '매주/격주 정기 미팅' },
  career: { name: '커리어 상담', icon: '🎯', description: '커리어 개발 논의' },
  feedback: { name: '피드백', icon: '💬', description: '성과 피드백 및 개선점 논의' },
  checkin: { name: '체크인', icon: '✅', description: '간단한 상태 체크' },
  project: { name: '프로젝트', icon: '📋', description: '프로젝트 관련 논의' }
};

// 미팅 주기
export const meetingFrequency = {
  weekly: '매주',
  biweekly: '격주',
  monthly: '월간',
  adhoc: '수시'
};

// 미팅 어젠다 템플릿
export const agendaTemplates = {
  regular: [
    '지난 주 하이라이트',
    '이번 주 목표 및 우선순위',
    '현재 어려움/블로커',
    '필요한 지원사항',
    '기타'
  ],
  career: [
    '현재 역할 및 업무 만족도',
    '단기/장기 커리어 목표',
    '역량 개발 계획',
    '필요한 학습/경험',
    '액션 아이템'
  ],
  feedback: [
    '최근 성과 리뷰',
    '강점 및 잘한 점',
    '개선이 필요한 영역',
    '구체적인 개선 방안',
    '다음 스텝'
  ],
  checkin: [
    '현재 진행 중인 작업',
    '블로커/이슈',
    '다음 계획'
  ]
};

// 샘플 미팅 데이터
export const sampleMeetings = [
  {
    id: 'meeting-1',
    date: '2025-02-15',
    time: '14:00',
    duration: 30,
    type: 'regular',
    status: 'scheduled',
    participants: {
      organizer: '100925427819464696032', // Peter
      attendee: '949f19e6-28f6-401f-9e7d-d657bfe78b1c' // 션
    },
    title: '정기 1:1 미팅',
    location: 'Zoom',
    agenda: [
      '지난 주 하이라이트',
      '이번 주 목표 및 우선순위',
      '현재 어려움/블로커',
      '필요한 지원사항'
    ],
    frequency: 'weekly'
  },
  {
    id: 'meeting-2',
    date: '2025-02-08',
    time: '14:00',
    duration: 30,
    type: 'regular',
    status: 'completed',
    participants: {
      organizer: '100925427819464696032', // Peter
      attendee: '949f19e6-28f6-401f-9e7d-d657bfe78b1c' // 션
    },
    title: '정기 1:1 미팅',
    location: 'Zoom',
    agenda: [
      '지난 주 하이라이트',
      '이번 주 목표 및 우선순위',
      '현재 어려움/블로커',
      '필요한 지원사항'
    ],
    notes: `## 지난 주 하이라이트
- 피드백 시스템 UI 완료
- 성능 개선 작업 80% 진행

## 이번 주 목표
- 피드백 시스템 API 연동
- 성능 테스트 완료

## 어려움/블로커
- API 스펙 일부 불명확 → 백엔드 팀과 논의 필요

## 지원사항
- 디자인 리뷰 요청`,
    actionItems: [
      { text: '백엔드 팀과 API 스펙 논의', completed: true, assignee: '100925427819464696032' },
      { text: '디자인팀에 리뷰 요청', completed: true, assignee: '100925427819464696032' },
      { text: '성능 테스트 결과 공유', completed: false, assignee: '100925427819464696032' }
    ],
    frequency: 'weekly'
  },
  {
    id: 'meeting-3',
    date: '2025-02-01',
    time: '14:00',
    duration: 30,
    type: 'regular',
    status: 'completed',
    participants: {
      organizer: '100925427819464696032', // Peter
      attendee: '949f19e6-28f6-401f-9e7d-d657bfe78b1c' // 션
    },
    title: '정기 1:1 미팅',
    location: 'Zoom',
    agenda: [
      '지난 주 하이라이트',
      '이번 주 목표 및 우선순위',
      '현재 어려움/블로커',
      '필요한 지원사항'
    ],
    notes: `## 지난 주 하이라이트
- OKR 시스템 완성
- 데이터 구조 리팩토링

## 이번 주 목표
- 360도 피드백 시스템 시작
- 컴포넌트 설계

## 어려움/블로커
- 없음

## 지원사항
- UX 가이드라인 확인 필요`,
    actionItems: [
      { text: 'UX 팀에 가이드라인 요청', completed: true, assignee: '100925427819464696032' },
      { text: '피드백 데이터 모델 설계', completed: true, assignee: '100925427819464696032' }
    ],
    frequency: 'weekly'
  },
  {
    id: 'meeting-4',
    date: '2025-01-20',
    time: '15:00',
    duration: 60,
    type: 'career',
    status: 'completed',
    participants: {
      organizer: '949f19e6-28f6-401f-9e7d-d657bfe78b1c', // 션
      attendee: '100925427819464696032' // Peter
    },
    title: 'Q1 커리어 상담',
    location: '회의실 A',
    agenda: [
      '현재 역할 및 업무 만족도',
      '단기/장기 커리어 목표',
      '역량 개발 계획',
      '필요한 학습/경험',
      '액션 아이템'
    ],
    notes: `## 현재 상황
- 프론트엔드 개발에 만족하고 있음
- 더 큰 영향력을 만들고 싶음

## 커리어 목표
- 단기(6개월): Senior 역할 공고화, 기술 리더십 강화
- 장기(2년): Staff Engineer 레벨 도달

## 역량 개발 계획
- 아키텍처 설계 역량 강화
- 주니어 멘토링 경험 쌓기
- 기술 블로그 작성

## 필요한 학습
- 시스템 디자인
- 성능 최적화
- 팀 리딩

## 액션 아이템
- 아키텍처 스터디 참여
- 주니어 1명 멘토링 시작
- 월 1회 기술 블로그 작성`,
    actionItems: [
      { text: '아키텍처 스터디 그룹 참여', completed: true, assignee: '100925427819464696032' },
      { text: '멘티 매칭 요청', completed: true, assignee: '100925427819464696032' },
      { text: '첫 블로그 포스트 작성', completed: false, assignee: '100925427819464696032' }
    ],
    frequency: 'adhoc'
  },
  {
    id: 'meeting-5',
    date: '2025-02-20',
    time: '10:00',
    duration: 30,
    type: 'feedback',
    status: 'scheduled',
    participants: {
      organizer: '949f19e6-28f6-401f-9e7d-d657bfe78b1c', // 션
      attendee: '100925427819464696032' // Peter
    },
    title: 'Q1 중간 피드백',
    location: 'Zoom',
    agenda: [
      '최근 성과 리뷰',
      '강점 및 잘한 점',
      '개선이 필요한 영역',
      '구체적인 개선 방안',
      '다음 스텝'
    ],
    frequency: 'adhoc'
  },
  {
    id: 'meeting-6',
    date: '2025-02-18',
    time: '11:00',
    duration: 30,
    type: 'checkin',
    status: 'scheduled',
    participants: {
      organizer: '100925427819464696032', // Peter
      attendee: '103598657260934052246' // 아녜스
    },
    title: '프로젝트 체크인',
    location: '회의실 B',
    agenda: [
      '현재 진행 중인 작업',
      '블로커/이슈',
      '다음 계획'
    ],
    frequency: 'adhoc'
  }
];

// 미팅 통계
export const meetingStats = {
  thisMonth: {
    total: 8,
    completed: 5,
    scheduled: 3,
    cancelled: 0
  },
  lastMonth: {
    total: 7,
    completed: 7,
    scheduled: 0,
    cancelled: 0
  },
  actionItems: {
    total: 15,
    completed: 11,
    pending: 4
  }
};

// 정기 미팅 설정
export const recurringMeetings = [
  {
    id: 'recurring-1',
    title: '션과 1:1',
    type: 'regular',
    frequency: 'weekly',
    dayOfWeek: 5, // Friday
    time: '14:00',
    duration: 30,
    participants: {
      organizer: '100925427819464696032',
      attendee: '949f19e6-28f6-401f-9e7d-d657bfe78b1c'
    },
    location: 'Zoom',
    active: true
  }
];
