<script>
  import { feedbackCategories } from '../data/feedbackData.js';
  import mockUsers from '../data/mockUsers.json';

  let { request, onBack, onSubmit } = $props();

  let ratings = $state({});
  let comments = $state({});
  let overallComment = $state('');

  // Initialize ratings for each category
  $effect(() => {
    feedbackCategories.forEach(category => {
      if (!ratings[category.id]) {
        ratings[category.id] = {};
      }
    });
  });

  let requester = $derived(() => {
    if (!request) return null;
    return mockUsers.results.find(u => u.id === request.requesterId);
  });

  let target = $derived(() => {
    if (!request) return null;
    return mockUsers.results.find(u => u.id === request.targetId);
  });

  let completionRate = $derived(() => {
    let totalQuestions = 0;
    let answeredQuestions = 0;

    feedbackCategories.forEach(category => {
      totalQuestions += category.questions.length;
      category.questions.forEach((_, idx) => {
        if (ratings[category.id]?.[idx]) {
          answeredQuestions++;
        }
      });
    });

    return totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  });

  function handleSubmit() {
    if (completionRate() < 100) {
      alert('모든 질문에 답변해주세요.');
      return;
    }

    onSubmit({
      requestId: request.id,
      ratings,
      comments,
      overallComment
    });
  }
</script>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-6">
    <button
      onclick={onBack}
      class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      뒤로 가기
    </button>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold text-gray-900">피드백 작성</h1>
        <div class="text-right">
          <div class="text-sm text-gray-500">완성도</div>
          <div class="text-2xl font-bold text-blue-600">{completionRate()}%</div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        {#if !request.isAnonymous && requester}
          <img src={requester.image_small} alt={requester.nickname_korean} class="w-12 h-12 rounded-full" />
          <div>
            <div class="text-sm text-gray-500">요청자</div>
            <div class="font-medium text-gray-900">{requester.nickname_korean}</div>
          </div>
        {:else}
          <div>
            <div class="text-sm text-gray-500">요청자</div>
            <div class="font-medium text-gray-900">익명</div>
          </div>
        {/if}

        <div class="text-gray-300">→</div>

        {#if target}
          <img src={target.image_small} alt={target.nickname_korean} class="w-12 h-12 rounded-full" />
          <div>
            <div class="text-sm text-gray-500">피드백 대상</div>
            <div class="font-medium text-gray-900">{target.nickname_korean}</div>
          </div>
        {/if}
      </div>

      <div class="mt-4 flex items-center gap-4 text-sm">
        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
          {request.type === 'upward' ? '⬆️ 상향' : request.type === 'downward' ? '⬇️ 하향' : request.type === 'peer' ? '↔️ 동료' : '🔄 자기평가'}
        </span>
        <span class="text-gray-500">마감일: {new Date(request.dueDate).toLocaleDateString('ko-KR')}</span>
      </div>
    </div>
  </div>

  <!-- Categories -->
  {#each feedbackCategories as category}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div class="flex items-center gap-2 mb-4">
        <span class="text-2xl">{category.icon}</span>
        <h2 class="text-lg font-bold text-gray-900">{category.name}</h2>
      </div>

      <div class="space-y-6">
        {#each category.questions as question, idx}
          <div class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <div class="text-sm font-medium text-gray-900 mb-3">{question}</div>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-3">
              {#each [1, 2, 3, 4, 5] as rating}
                <button
                  type="button"
                  class="w-10 h-10 rounded-lg border-2 transition-all {ratings[category.id]?.[idx] === rating ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}"
                  onclick={() => {
                    if (!ratings[category.id]) ratings[category.id] = {};
                    ratings[category.id][idx] = rating;
                  }}
                >
                  {rating}
                </button>
              {/each}
              <div class="ml-2 text-xs text-gray-500">
                <div>1: 부족 / 5: 우수</div>
              </div>
            </div>

            <!-- Comment -->
            <textarea
              bind:value={comments[`${category.id}-${idx}`]}
              placeholder="구체적인 피드백을 작성해주세요 (선택사항)"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="2"
            ></textarea>
          </div>
        {/each}
      </div>
    </div>
  {/each}

  <!-- Overall Comment -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
    <h2 class="text-lg font-bold text-gray-900 mb-4">종합 의견</h2>
    <textarea
      bind:value={overallComment}
      placeholder="전반적인 피드백을 작성해주세요..."
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      rows="6"
    ></textarea>
  </div>

  <!-- Actions -->
  <div class="flex justify-end gap-3 mb-8">
    <button
      onclick={onBack}
      class="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      취소
    </button>
    <button
      onclick={handleSubmit}
      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={completionRate() < 100}
    >
      제출하기
    </button>
  </div>
</div>
