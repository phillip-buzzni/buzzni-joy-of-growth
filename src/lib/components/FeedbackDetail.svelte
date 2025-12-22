<script>
  import { feedbackCategories, feedbackTypes } from '../data/feedbackData.js';
  import mockUsers from '../data/mockUsers.json';

  let { feedback, onBack } = $props();

  let requester = $derived(() => {
    if (!feedback || feedback.isAnonymous) return null;
    return mockUsers.results.find(u => u.id === feedback.requesterId);
  });

  let target = $derived(() => {
    if (!feedback) return null;
    return mockUsers.results.find(u => u.id === feedback.targetId);
  });

  let averageScore = $derived(() => {
    if (!feedback?.ratings) return 0;
    let total = 0;
    let count = 0;

    Object.values(feedback.ratings).forEach(categoryRatings => {
      Object.values(categoryRatings).forEach(rating => {
        total += rating;
        count++;
      });
    });

    return count > 0 ? (total / count).toFixed(1) : 0;
  });

  function getCategoryAverage(categoryId) {
    if (!feedback?.ratings?.[categoryId]) return 0;
    const ratings = Object.values(feedback.ratings[categoryId]);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  }

  function getRatingColor(rating) {
    if (rating >= 4.5) return 'text-green-600 bg-green-50';
    if (rating >= 3.5) return 'text-blue-600 bg-blue-50';
    if (rating >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
        <h1 class="text-2xl font-bold text-gray-900">피드백 상세</h1>
        <div class="text-right">
          <div class="text-sm text-gray-500">평균 점수</div>
          <div class="text-3xl font-bold {getRatingColor(parseFloat(averageScore()))}">{averageScore()} / 5.0</div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        {#if feedback.isAnonymous}
          <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <div class="text-sm text-gray-500">피드백 제공자</div>
            <div class="font-medium text-gray-900">익명</div>
          </div>
        {:else if requester}
          <img src={requester.image_small} alt={requester.nickname_korean} class="w-12 h-12 rounded-full" />
          <div>
            <div class="text-sm text-gray-500">피드백 제공자</div>
            <div class="font-medium text-gray-900">{requester.nickname_korean}</div>
            {#if requester.chapters?.korean_name}
              <div class="text-sm text-gray-500">{requester.chapters.korean_name}</div>
            {/if}
          </div>
        {/if}

        <div class="text-gray-300">→</div>

        {#if target}
          <img src={target.image_small} alt={target.nickname_korean} class="w-12 h-12 rounded-full" />
          <div>
            <div class="text-sm text-gray-500">피드백 대상</div>
            <div class="font-medium text-gray-900">{target.nickname_korean}</div>
            {#if target.chapters?.korean_name}
              <div class="text-sm text-gray-500">{target.chapters.korean_name}</div>
            {/if}
          </div>
        {/if}
      </div>

      <div class="mt-4 flex items-center gap-4 text-sm">
        <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
          {feedbackTypes[feedback.type]?.icon} {feedbackTypes[feedback.type]?.name}
        </span>
        <span class="text-gray-500">작성일: {new Date(feedback.submittedAt).toLocaleDateString('ko-KR')}</span>
      </div>
    </div>
  </div>

  <!-- Category Scores -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
    <h2 class="text-lg font-bold text-gray-900 mb-4">역량별 평가</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {#each feedbackCategories as category}
        {@const avg = getCategoryAverage(category.id)}
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl mb-2">{category.icon}</div>
          <div class="text-sm text-gray-600 mb-1">{category.name}</div>
          <div class="text-xl font-bold {getRatingColor(parseFloat(avg))}">{avg}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Detailed Feedback -->
  {#each feedbackCategories as category}
    {#if feedback.ratings?.[category.id]}
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">{category.icon}</span>
          <h2 class="text-lg font-bold text-gray-900">{category.name}</h2>
          <span class="ml-auto text-lg font-bold {getRatingColor(parseFloat(getCategoryAverage(category.id)))}">{getCategoryAverage(category.id)}</span>
        </div>

        <div class="space-y-4">
          {#each category.questions as question, idx}
            {#if feedback.ratings[category.id][idx]}
              <div class="border-l-4 border-gray-200 pl-4">
                <div class="flex items-start justify-between mb-2">
                  <div class="text-sm font-medium text-gray-900 flex-1">{question}</div>
                  <div class="flex items-center gap-1 ml-4">
                    {#each Array(5) as _, i}
                      <svg class="w-5 h-5 {i < feedback.ratings[category.id][idx] ? 'text-yellow-400' : 'text-gray-200'}" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                    <span class="ml-2 text-sm font-bold text-gray-700">{feedback.ratings[category.id][idx]}</span>
                  </div>
                </div>
                {#if feedback.comments?.[`${category.id}-${idx}`]}
                  <div class="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded">
                    {feedback.comments[`${category.id}-${idx}`]}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  {/each}

  <!-- Overall Comment -->
  {#if feedback.overallComment}
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 class="text-lg font-bold text-gray-900 mb-4">종합 의견</h2>
      <div class="text-gray-700 whitespace-pre-wrap leading-relaxed">{feedback.overallComment}</div>
    </div>
  {/if}
</div>
