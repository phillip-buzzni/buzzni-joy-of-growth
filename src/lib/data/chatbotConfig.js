// 챗봇 설정

export const chatbotConfig = {
  title: '피드백 코치',
  subtitle: '리더십 원칙 기반 피드백 조언',
  placeholder: '피드백이 필요한 상황을 설명해주세요...',
  welcomeMessage: `안녕하세요! 저는 **피드백 코치**입니다. 🤖

버즈니 리더십 원칙에 기반해서 피드백을 드리는 것을 도와드립니다.

**이런 상황을 말씀해주세요:**
- 동료에게 피드백을 주고 싶은 상황
- 피드백을 어떻게 전달해야 할지 고민되는 경우
- 리더십 원칙과 연결해서 조언이 필요한 상황

예시: "팀원이 마감을 자주 못 지키는데 어떻게 피드백하면 좋을까요?"`,
  storageKey: 'buzzni-chat-history',
  maxHistoryLength: 50, // 저장할 최대 메시지 수
};

// 메시지 스타일
export const messageStyles = {
  user: {
    container: 'justify-end',
    bubble: 'bg-blue-500 text-white rounded-2xl rounded-br-md',
    time: 'text-blue-200',
  },
  assistant: {
    container: 'justify-start',
    bubble: 'bg-gray-100 text-gray-900 rounded-2xl rounded-bl-md',
    time: 'text-gray-400',
  },
};

// 샘플 질문 (빠른 시작용)
export const sampleQuestions = [
  '팀원이 마감을 자주 못 지켜요',
  '동료가 회의에서 말을 너무 많이 해요',
  '리더가 마이크로매니징을 해요',
  '팀원의 동기가 떨어진 것 같아요',
];
