<script>
  import { onMount } from 'svelte';
  import { chatbotConfig, sampleQuestions } from '../data/chatbotConfig.js';
  import { sendMessage, saveApiKey, loadApiKey, clearApiKey, getProviderInfo, hasEnvApiKey } from '../services/aiService.js';
  import ChatMessage from './ChatMessage.svelte';
  import ChatInput from './ChatInput.svelte';

  // 상태
  let isOpen = $state(false);
  let isFullscreen = $state(false);
  let messages = $state([]);
  let inputText = $state('');
  let isLoading = $state(false);
  let error = $state('');
  let apiKey = $state('');
  let showSettings = $state(false);
  let messagesContainer = $state(null);

  // API 키 설정 여부
  let hasApiKey = $derived(apiKey.trim().length > 0);

  // 환경변수에 키가 있는지 (있으면 설정 UI 숨김)
  let isEnvKeyConfigured = $state(false);

  // 초기화
  onMount(() => {
    // API 키 로드
    apiKey = loadApiKey();
    isEnvKeyConfigured = hasEnvApiKey();

    // 저장된 메시지 로드
    const saved = localStorage.getItem(chatbotConfig.storageKey);
    if (saved) {
      try {
        messages = JSON.parse(saved);
      } catch (e) {
        messages = [];
      }
    }

    // 웰컴 메시지가 없으면 추가
    if (messages.length === 0) {
      messages = [{
        type: 'assistant',
        content: chatbotConfig.welcomeMessage,
        timestamp: new Date().toISOString(),
      }];
    }
  });

  // 메시지 저장
  function saveMessages() {
    const toSave = messages.slice(-chatbotConfig.maxHistoryLength);
    localStorage.setItem(chatbotConfig.storageKey, JSON.stringify(toSave));
  }

  // 스크롤 하단으로
  function scrollToBottom() {
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  }

  // 메시지 전송
  async function handleSend(text) {
    if (!text.trim() || isLoading) return;

    error = '';

    // 사용자 메시지 추가
    const userMessage = {
      type: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    messages = [...messages, userMessage];
    scrollToBottom();

    isLoading = true;

    try {
      // AI 응답 요청
      const response = await sendMessage(apiKey, messages);

      // AI 응답 추가
      const assistantMessage = {
        type: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      messages = [...messages, assistantMessage];
      saveMessages();
    } catch (err) {
      error = err.message || '응답을 가져오는데 실패했습니다.';
      // 에러 메시지 추가
      messages = [...messages, {
        type: 'assistant',
        content: `오류가 발생했습니다: ${error}\n\nAPI 키를 확인해주세요.`,
        timestamp: new Date().toISOString(),
      }];
    } finally {
      isLoading = false;
      scrollToBottom();
    }
  }

  // API 키 저장
  function handleSaveApiKey() {
    saveApiKey(apiKey);
    showSettings = false;
  }

  // API 키 삭제
  function handleClearApiKey() {
    clearApiKey();
    apiKey = '';
  }

  // 대화 초기화
  function handleClearChat() {
    messages = [{
      type: 'assistant',
      content: chatbotConfig.welcomeMessage,
      timestamp: new Date().toISOString(),
    }];
    saveMessages();
  }

  // 샘플 질문 클릭
  function handleSampleQuestion(question) {
    handleSend(question);
  }

  // 토글
  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen) {
      scrollToBottom();
    }
  }

  // 전체 화면 토글
  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    scrollToBottom();
  }

  const providerInfo = getProviderInfo();
</script>

<!-- 플로팅 버튼 -->
<button
  onclick={toggleChat}
  class="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg
         hover:bg-blue-600 hover:scale-110 transition-all z-50
         flex items-center justify-center"
  aria-label="챗봇 열기"
>
  {#if isOpen}
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  {:else}
    <span class="text-2xl">💬</span>
  {/if}
</button>

<!-- 채팅창 -->
{#if isOpen}
  <div class="fixed bg-white shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300
              {isFullscreen
                ? 'inset-0 rounded-none'
                : 'bottom-24 right-6 w-[480px] h-[700px] rounded-2xl'}">
    <!-- 헤더 -->
    <div class="bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
      <div>
        <h3 class="font-semibold">{chatbotConfig.title}</h3>
        <p class="text-xs text-blue-100">{chatbotConfig.subtitle}</p>
      </div>
      <div class="flex gap-2">
        <!-- 전체 화면 버튼 -->
        <button
          onclick={toggleFullscreen}
          class="p-1.5 hover:bg-blue-400 rounded-lg transition-colors"
          aria-label={isFullscreen ? "작은 화면으로" : "전체 화면으로"}
        >
          {#if isFullscreen}
            <!-- 축소 아이콘 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
            </svg>
          {:else}
            <!-- 확대 아이콘 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          {/if}
        </button>
        <!-- 설정 버튼 -->
        <button
          onclick={() => showSettings = !showSettings}
          class="p-1.5 hover:bg-blue-400 rounded-lg transition-colors"
          aria-label="설정"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <!-- 초기화 버튼 -->
        <button
          onclick={handleClearChat}
          class="p-1.5 hover:bg-blue-400 rounded-lg transition-colors"
          aria-label="대화 초기화"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <!-- 닫기 버튼 (전체 화면일 때만 표시) -->
        {#if isFullscreen}
          <button
            onclick={toggleChat}
            class="p-1.5 hover:bg-blue-400 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
    </div>

    <!-- 설정 패널 (환경변수 키가 없을 때만 표시) -->
    {#if showSettings && !isEnvKeyConfigured}
      <div class="bg-gray-50 border-b border-gray-200 p-4">
        <div class="text-sm text-gray-600 mb-2">
          AI: {providerInfo.provider} ({providerInfo.model})
        </div>
        <div class="flex gap-2">
          <input
            type="password"
            bind:value={apiKey}
            placeholder="API 키 입력"
            class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg
                   focus:outline-none focus:border-blue-500"
          />
          <button
            onclick={handleSaveApiKey}
            class="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
          >
            저장
          </button>
        </div>
        {#if hasApiKey}
          <button
            onclick={handleClearApiKey}
            class="mt-2 text-xs text-red-500 hover:underline"
          >
            API 키 삭제
          </button>
        {/if}
      </div>
    {/if}

    <!-- 설정 패널 (환경변수 키가 있을 때) -->
    {#if showSettings && isEnvKeyConfigured}
      <div class="bg-green-50 border-b border-green-200 px-4 py-3">
        <p class="text-sm text-green-800">
          ✓ 환경변수에서 API 키가 설정되어 있습니다.
        </p>
        <p class="text-xs text-green-600 mt-1">
          AI: {providerInfo.provider} ({providerInfo.model})
        </p>
      </div>
    {/if}

    <!-- API 키 없을 때 안내 (환경변수도 없고 localStorage도 없을 때) -->
    {#if !hasApiKey && !showSettings && !isEnvKeyConfigured}
      <div class="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <p class="text-sm text-yellow-800">
          ⚠️ API 키가 설정되지 않았습니다.
          <button
            onclick={() => showSettings = true}
            class="underline hover:no-underline"
          >
            설정하기
          </button>
        </p>
      </div>
    {/if}

    <!-- 메시지 영역 -->
    <div
      bind:this={messagesContainer}
      class="flex-1 overflow-y-auto p-4 bg-gray-50"
    >
      <div class={isFullscreen ? 'max-w-2xl mx-auto' : ''}>
        {#each messages as message (message.timestamp)}
          <ChatMessage {message} type={message.type} {isFullscreen} />
        {/each}

      <!-- 로딩 표시 -->
      {#if isLoading}
        <div class="flex justify-start mb-3">
          <div class="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
              <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
            </div>
          </div>
        </div>
      {/if}

      <!-- 샘플 질문 (첫 메시지만 있을 때) -->
      {#if messages.length === 1 && !isLoading}
        <div class="mt-4">
          <p class="text-xs text-gray-500 mb-2">빠른 시작:</p>
          <div class="flex flex-wrap gap-2">
            {#each sampleQuestions as question}
              <button
                onclick={() => handleSampleQuestion(question)}
                disabled={!hasApiKey}
                class="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full
                       hover:bg-gray-100 hover:border-gray-300 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {question}
              </button>
            {/each}
          </div>
        </div>
      {/if}
      </div>
    </div>

    <!-- 입력 영역 -->
    <ChatInput
      bind:value={inputText}
      onSend={handleSend}
      {isLoading}
    />
  </div>
{/if}
