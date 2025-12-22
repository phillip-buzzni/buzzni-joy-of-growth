<script>
  import { principleColors } from '$lib/data/leadershipPrinciples';
  import PrincipleAssessment from './PrincipleAssessment.svelte';

  let { principle } = $props();

  let colorScheme = $derived(principleColors[principle.color]);
  let expandedBehavior = $state(null);

  function toggleBehavior(index) {
    expandedBehavior = expandedBehavior === index ? null : index;
  }
</script>

<div class="max-w-3xl mx-auto px-4 py-6">
  <!-- Header -->
  <div class="mb-6 p-4 {colorScheme.bg} border {colorScheme.border} rounded-lg">
    <div class="flex items-start gap-3">
      <div class="text-4xl">{principle.icon}</div>
      <div class="flex-1">
        <h1 class="{colorScheme.text} text-xl font-bold">{principle.name}</h1>
        <p class="text-gray-500 text-sm mb-2">{principle.nameEn}</p>
        <p class="text-gray-700 text-sm leading-relaxed">{principle.fullDescription}</p>
      </div>
    </div>
  </div>

  <!-- Behaviors - 아코디언 스타일 -->
  <div class="mb-6">
    <h2 class="text-lg font-bold text-gray-900 mb-3">핵심 행동 지표</h2>
    <div class="space-y-2">
      {#each principle.behaviors as behavior, index}
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            onclick={() => toggleBehavior(index)}
            class="w-full text-left p-3 flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <span class="{colorScheme.text} font-bold">{index + 1}.</span>
            <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
              {behavior.level === 'junior' ? 'Junior' : behavior.level === 'mid' ? 'Mid' : behavior.level === 'senior' ? 'Senior' : 'Lead'}
            </span>
            <span class="font-semibold text-sm text-gray-900 flex-1">{behavior.title}</span>
            <span class="text-gray-400 text-sm">{expandedBehavior === index ? '−' : '+'}</span>
          </button>

          {#if expandedBehavior === index}
            <div class="px-4 pb-4 border-t border-gray-100">
              <p class="text-gray-700 text-sm py-3">{behavior.description}</p>
              <div class="bg-gray-50 rounded-lg p-3">
                <h4 class="font-semibold text-gray-900 text-xs mb-2">💡 구체적 예시:</h4>
                <ul class="space-y-1">
                  {#each behavior.examples as example}
                    <li class="text-gray-700 text-xs flex items-start gap-2">
                      <span class="{colorScheme.text}">•</span>
                      <span>{example}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Self Assessment -->
  <div class="mb-6">
    <PrincipleAssessment {principle} />
  </div>

  <!-- Reflection Questions -->
  <div class="bg-white rounded-lg border border-gray-200 p-4">
    <h2 class="text-lg font-bold text-gray-900 mb-2">🤔 자기 성찰 질문</h2>
    <ul class="space-y-2">
      {#each principle.questions as question}
        <li class="flex items-start gap-2 text-sm">
          <span class="{colorScheme.text} font-bold">Q.</span>
          <span class="text-gray-700">{question}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>
