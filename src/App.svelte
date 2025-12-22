<script>
  import Router, { link, location } from 'svelte-spa-router';
  import { routes, navItems } from '$lib/router';
  import ChatBot from '$lib/components/ChatBot.svelte';
</script>

{#if $location === '/presentation' || $location === '/'}
  <!-- 발표 페이지: 전체 화면 -->
  <Router {routes} />
{:else}
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex">
          <a href="/" use:link class="text-xl font-bold leading-none py-2 flex items-center flex-1">
            Joy Of Growth
          </a>
          {#each navItems as item}
            <a
              href={item.path}
              use:link
              class="border-b-2 px-4 py-4 font-medium transition-colors {$location === item.path || ($location === '/' && item.path === '/users') ? 'text-blue-600 border-blue-600' : 'text-gray-600 hover:text-gray-900 border-transparent'}"
            >
              {item.icon} {item.label}
            </a>
          {/each}
        </div>
      </div>
    </nav>

    <!-- Content -->
    <main>
      <Router {routes} />
    </main>

    <!-- 플로팅 챗봇 -->
    <ChatBot />
  </div>
{/if}
