<script>
  import { chatbotConfig } from '../data/chatbotConfig.js';

  let { value = $bindable(''), onSend, isLoading = false } = $props();

  function handleKeydown(event) {
    // Enter로 전송 (Shift+Enter는 줄바꿈)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    if (!value.trim() || isLoading) return;
    onSend?.(value.trim());
    value = '';
  }
</script>

<div class="border-t border-gray-200 bg-white p-3">
  <div class="flex gap-2 items-end">
    <textarea
      bind:value
      onkeydown={handleKeydown}
      placeholder={chatbotConfig.placeholder}
      disabled={isLoading}
      rows="1"
      class="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl resize-none
             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
             disabled:bg-gray-50 disabled:text-gray-400
             text-sm leading-relaxed max-h-32 overflow-y-auto"
      style="min-height: 42px;"
    ></textarea>
    <button
      onclick={handleSend}
      disabled={!value.trim() || isLoading}
      class="px-4 py-2.5 bg-blue-500 text-white rounded-xl
             hover:bg-blue-600 transition-colors
             disabled:bg-gray-300 disabled:cursor-not-allowed
             flex items-center justify-center min-w-[60px]"
    >
      {#if isLoading}
        <div class="flex gap-1">
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
          <span class="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
        </div>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      {/if}
    </button>
  </div>
</div>
