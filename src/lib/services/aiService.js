// AI 서비스 - 교체 가능한 구조
// 현재: Google Gemini 2.5 Pro Preview
// 다른 AI로 교체 시 이 파일만 수정

import { leadershipPrinciples } from "../data/leadershipPrinciples.js";

// API 설정
// 모델 옵션:
// - gemini-2.5-pro-preview-05-06 (최신, 제한 있음)
// - gemini-2.0-flash (빠름, 제한 여유)
// - gemini-1.5-flash (안정적, 제한 여유)
// - gemini-1.5-pro (고품질, 제한 있음)
const AI_CONFIG = {
  provider: "gemini", // 'gemini' | 'openai' | 'claude'
  // model: "gemini-2.0-flash", // 더 여유로운 rate limit
  model: "gemini-3-flash-preview",
  apiEndpoint: "https://generativelanguage.googleapis.com/v1beta/models",
};

// 리더십 원칙을 간결한 형태로 변환
function getPrinciplesSummary() {
  return leadershipPrinciples.map((p) => ({
    id: p.id,
    name: p.name,
    nameEn: p.nameEn,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    principles: p.principles,
    antiPatterns: p.antiPatterns,
  }));
}

// 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 버즈니의 리더십 원칙 전문가 "피드백 코치"입니다.

## 역할
사용자가 피드백이 필요한 상황/사례를 설명하면:
1. 관련된 리더십 원칙을 찾아 연결합니다
2. 구체적인 피드백 문구를 제안합니다
3. 효과적인 피드백 전달 방법을 조언합니다

## 응답 형식
- 마크다운 형식으로 구조화해서 응답합니다
- 관련 리더십 원칙은 **볼드**로 강조하고 emoji를 붙여줍니다
- 피드백 예시는 인용구(>)로 표시합니다
- 핵심 포인트는 테이블로 정리합니다

## 피드백 원칙
- 비난이 아닌 성장 관점으로 접근
- 사람이 아닌 행동에 초점
- 구체적 사실 + 영향 + 대안 제시
- 진정한 관심을 바탕으로 솔직하게

## 버즈니 리더십 원칙
${JSON.stringify(getPrinciplesSummary(), null, 2)}

## 중요
- 한국어로 응답합니다
- 피드백 예시는 실제로 사용할 수 있는 자연스러운 문장으로 작성합니다
- 상황에 맞는 리더십 원칙을 1-3개 선택해서 연결합니다`;

// Gemini API 호출
async function callGemini(apiKey, messages) {
  const url = `${AI_CONFIG.apiEndpoint}/${AI_CONFIG.model}:generateContent?key=${apiKey}`;

  // 대화 히스토리를 Gemini 형식으로 변환
  const contents = messages.map((msg) => ({
    role: msg.type === "user" ? "user" : "model",
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "API 요청 실패");
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "응답을 생성할 수 없습니다."
  );
}

// OpenAI API 호출 (추후 교체용)
async function callOpenAI(apiKey, messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "API 요청 실패");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "응답을 생성할 수 없습니다.";
}

// Claude API 호출 (추후 교체용)
async function callClaude(apiKey, messages) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-sonnet-20240229",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: messages.map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "API 요청 실패");
  }

  const data = await response.json();
  return data.content?.[0]?.text || "응답을 생성할 수 없습니다.";
}

// 메인 API 호출 함수
export async function sendMessage(apiKey, messages) {
  if (!apiKey) {
    throw new Error("API 키가 설정되지 않았습니다.");
  }

  switch (AI_CONFIG.provider) {
    case "gemini":
      return await callGemini(apiKey, messages);
    case "openai":
      return await callOpenAI(apiKey, messages);
    case "claude":
      return await callClaude(apiKey, messages);
    default:
      throw new Error(`지원하지 않는 AI provider: ${AI_CONFIG.provider}`);
  }
}

// API 키 저장/로드
// 우선순위: 1. 환경변수 2. localStorage
const API_KEY_STORAGE_KEY = "buzzni-ai-api-key";

// 환경변수에서 API 키 가져오기 (Vite 환경)
function getEnvApiKey() {
  try {
    return import.meta.env.VITE_GEMINI_API_KEY || "";
  } catch {
    return "";
  }
}

export function saveApiKey(key) {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
}

export function loadApiKey() {
  // 환경변수 우선, 없으면 localStorage
  const envKey = getEnvApiKey();
  if (envKey) return envKey;
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
}

export function clearApiKey() {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

// 환경변수에 키가 설정되어 있는지 확인
export function hasEnvApiKey() {
  return !!getEnvApiKey();
}

// 현재 설정된 provider 정보
export function getProviderInfo() {
  return {
    provider: AI_CONFIG.provider,
    model: AI_CONFIG.model,
  };
}
