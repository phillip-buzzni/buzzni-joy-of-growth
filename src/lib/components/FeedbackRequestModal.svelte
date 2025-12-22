<script>
  import mockUsers from '../data/mockUsers.json';
  import { feedbackTypes } from '../data/feedbackData.js';

  let { isOpen = false, onClose, onSubmit } = $props();

  let selectedType = $state('peer');
  let selectedTargets = $state([]);
  let dueDate = $state('');
  let isAnonymous = $state(false);

  let searchQuery = $state('');

  let filteredUsers = $derived(() => {
    if (!searchQuery) return mockUsers.results;
    const query = searchQuery.toLowerCase();
    return mockUsers.results.filter(user =>
      user.nickname_korean.toLowerCase().includes(query) ||
      user.name_english.toLowerCase().includes(query) ||
      user.squads?.korean_name?.toLowerCase().includes(query) ||
      user.chapters?.korean_name?.toLowerCase().includes(query)
    );
  });

  function toggleTarget(userId) {
    if (selectedTargets.includes(userId)) {
      selectedTargets = selectedTargets.filter(id => id !== userId);
    } else {
      selectedTargets = [...selectedTargets, userId];
    }
  }

  function handleSubmit() {
    if (selectedTargets.length === 0 || !dueDate) {
      alert('피드백 대상과 마감일을 선택해주세요.');
      return;
    }

    onSubmit({
      type: selectedType,
      targetIds: selectedTargets,
      dueDate,
      isAnonymous
    });

    // Reset form
    selectedTargets = [];
    dueDate = '';
    isAnonymous = false;
    searchQuery = '';
  }

  let minDate = $derived(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onclick={onClose}>
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onclick={(e) => e.stopPropagation()}>
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-900">피드백 요청하기</h2>
        <button onclick={onClose} class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- 피드백 유형 선택 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">피드백 유형</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            {#each Object.entries(feedbackTypes) as [type, info]}
              <button
                type="button"
                class="p-4 border-2 rounded-lg transition-all {selectedType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
                onclick={() => selectedType = type}
              >
                <div class="text-2xl mb-2">{info.icon}</div>
                <div class="text-sm font-medium text-gray-900">{info.name}</div>
                <div class="text-xs text-gray-500 mt-1">{info.description}</div>
              </button>
            {/each}
          </div>
        </div>

        <!-- 마감일 -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">마감일</label>
          <input
            type="date"
            bind:value={dueDate}
            min={minDate()}
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- 익명 여부 -->
        {#if selectedType === 'upward'}
          <div class="mb-6">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                bind:checked={isAnonymous}
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-gray-700">익명으로 받기 (상향 피드백에만 적용)</span>
            </label>
          </div>
        {/if}

        <!-- 피드백 대상 선택 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            피드백 대상 ({selectedTargets.length}명 선택)
          </label>

          <!-- 검색 -->
          <div class="mb-4">
            <div class="relative">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="이름, 스쿼드, 챕터로 검색..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- 선택된 대상 -->
          {#if selectedTargets.length > 0}
            <div class="mb-4 flex flex-wrap gap-2">
              {#each selectedTargets as userId}
                {@const user = mockUsers.results.find(u => u.id === userId)}
                {#if user}
                  <div class="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    <img src={user.image_small} alt={user.nickname_korean} class="w-5 h-5 rounded-full" />
                    <span>{user.nickname_korean}</span>
                    <button onclick={() => toggleTarget(userId)} class="hover:text-blue-900">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}

          <!-- 사용자 목록 -->
          <div class="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {#each filteredUsers as user}
              <button
                type="button"
                class="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors {selectedTargets.includes(user.id) ? 'bg-blue-50' : ''}"
                onclick={() => toggleTarget(user.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedTargets.includes(user.id)}
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  readonly
                />
                <img src={user.image_small} alt={user.nickname_korean} class="w-10 h-10 rounded-full" />
                <div class="flex-1 text-left">
                  <div class="font-medium text-gray-900">{user.nickname_korean}</div>
                  <div class="text-sm text-gray-500">
                    {#if user.squads?.korean_name}
                      <span>👥 {user.squads.korean_name}</span>
                    {/if}
                    {#if user.chapters?.korean_name}
                      <span class="ml-2">📚 {user.chapters.korean_name}</span>
                    {/if}
                  </div>
                </div>
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onclick={onClose}
          class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          취소
        </button>
        <button
          onclick={handleSubmit}
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={selectedTargets.length === 0 || !dueDate}
        >
          요청하기
        </button>
      </div>
    </div>
  </div>
{/if}
