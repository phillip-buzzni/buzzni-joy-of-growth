<script>
  import { principleColors } from '$lib/data/leadershipPrinciples';

  let { principle } = $props();

  let colorScheme = $derived(principleColors[principle.color]);

  // Assessment state: behavior index -> rating (1-5)
  let ratings = $state({});

  // Rating descriptions
  const ratingLabels = {
    1: '전혀 그렇지 않다',
    2: '그렇지 않다',
    3: '보통이다',
    4: '그렇다',
    5: '매우 그렇다'
  };

  function handleRatingChange(behaviorIndex, rating) {
    ratings[behaviorIndex] = rating;
  }

  function calculateScore() {
    const values = Object.values(ratings);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return (sum / values.length).toFixed(1);
  }

  function getScoreLevel(score) {
    if (score >= 4.5) return { text: '탁월함', color: 'text-green-600' };
    if (score >= 4.0) return { text: '우수함', color: 'text-blue-600' };
    if (score >= 3.0) return { text: '보통', color: 'text-gray-600' };
    if (score >= 2.0) return { text: '개선 필요', color: 'text-orange-600' };
    return { text: '많은 개선 필요', color: 'text-red-600' };
  }

  let score = $derived(calculateScore());
  let scoreLevel = $derived(getScoreLevel(parseFloat(score)));
  let isComplete = $derived(Object.keys(ratings).length === principle.behaviors.length);
</script>

<div class="bg-white rounded-xl border-2 {colorScheme.border} p-8">
  <div class="flex items-center gap-3 mb-6">
    <span class="text-3xl">{principle.icon}</span>
    <div class="flex-1">
      <h2 class="{colorScheme.text} text-2xl font-bold">자가 평가</h2>
      <p class="text-gray-600 text-sm mt-1">각 행동 지표에 대해 솔직하게 평가해주세요</p>
    </div>
    {#if isComplete}
      <div class="text-right">
        <div class="text-3xl font-bold {scoreLevel.color}">{score}</div>
        <div class="text-sm {scoreLevel.color} font-medium">{scoreLevel.text}</div>
      </div>
    {/if}
  </div>

  <div class="space-y-6">
    {#each principle.behaviors as behavior, index}
      <div class="pb-6 border-b border-gray-200 last:border-0">
        <h3 class="font-bold text-gray-900 mb-3">
          {index + 1}. {behavior.title}
        </h3>
        <p class="text-gray-600 text-sm mb-4">{behavior.description}</p>

        <div class="space-y-2">
          <div class="flex items-center justify-between gap-2">
            {#each [1, 2, 3, 4, 5] as rating}
              <label class="flex-1">
                <input
                  type="radio"
                  name="rating-{index}"
                  value={rating}
                  checked={ratings[index] === rating}
                  onchange={() => handleRatingChange(index, rating)}
                  class="sr-only peer"
                />
                <div class="
                  cursor-pointer text-center py-3 px-2 rounded-lg border-2 transition-all
                  peer-checked:border-{principle.color}-500 peer-checked:bg-{principle.color}-50 peer-checked:font-bold
                  hover:border-gray-400 border-gray-200
                  {ratings[index] === rating ? colorScheme.border + ' ' + colorScheme.bg + ' font-bold' : ''}
                ">
                  <div class="text-lg font-bold">{rating}</div>
                  <div class="text-xs text-gray-600 mt-1">{ratingLabels[rating]}</div>
                </div>
              </label>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if isComplete}
    <div class="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
      <h3 class="font-bold text-gray-900 mb-3">📊 평가 완료</h3>
      <p class="text-gray-700 mb-4">
        <span class="{colorScheme.text} font-bold">{principle.name}</span> 영역의 평균 점수는
        <span class="{scoreLevel.color} text-xl font-bold">{score}점</span>
        (<span class="{scoreLevel.color} font-semibold">{scoreLevel.text}</span>)입니다.
      </p>
      {#if parseFloat(score) < 4.0}
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-blue-800 text-sm">
            💡 <strong>성장 팁:</strong> 점수가 낮은 항목을 중심으로 개선 계획을 세워보세요.
            동료에게 피드백을 요청하거나 관련 역량을 키울 수 있는 프로젝트에 참여해보는 것도 좋습니다.
          </p>
        </div>
      {:else}
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <p class="text-green-800 text-sm">
            ✨ <strong>잘하고 있어요!</strong> 이 강점을 더욱 발전시키고 팀원들과 공유해보세요.
          </p>
        </div>
      {/if}
    </div>
  {/if}
</div>
