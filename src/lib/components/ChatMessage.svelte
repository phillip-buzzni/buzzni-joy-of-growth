<script>
  import { messageStyles } from '../data/chatbotConfig.js';
  import { parseMarkdown } from '../utils/markdown.js';

  let { message, type = 'assistant', isFullscreen = false } = $props();

  let styles = $derived(messageStyles[type]);
  let formattedContent = $derived(parseMarkdown(message.content));

  // 시간 포맷
  function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  }
</script>

<div class="flex {styles.container} mb-3">
  <div class="flex flex-col {type === 'user' ? 'items-end' : 'items-start'}" style="max-width: {isFullscreen ? '65ch' : '85%'}">
    <div class="px-4 py-3 {styles.bubble} shadow-sm w-full">
      <div class="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {@html formattedContent}
      </div>
    </div>
    {#if message.timestamp}
      <span class="text-xs {styles.time} mt-1 px-1">
        {formatTime(message.timestamp)}
      </span>
    {/if}
  </div>
</div>
