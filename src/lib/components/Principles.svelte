<script>
  import { leadershipPrinciples, principleColors } from '$lib/data/leadershipPrinciples';
  import PrincipleDetail from './PrincipleDetail.svelte';

  let { onSelectPrinciple } = $props();

  let selectedPrinciple = $state(leadershipPrinciples[0]);

  function handlePrincipleClick(principle) {
    selectedPrinciple = principle;
  }
</script>

<div class="flex h-[calc(100vh-64px)]">
  <!-- 왼쪽 사이드바: 원칙 리스트 -->
  <div class="w-80 shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-bold text-gray-900">버즈니 리더십 원칙</h2>
      <p class="text-sm text-gray-600 mt-1">7가지 핵심 가치</p>
    </div>

    <nav class="p-2">
      {#each leadershipPrinciples as principle (principle.id)}
        {@const colorScheme = principleColors[principle.color]}
        {@const isSelected = selectedPrinciple?.id === principle.id}
        <button
          onclick={() => handlePrincipleClick(principle)}
          class="w-full text-left p-3 rounded-lg mb-1 transition-all duration-200 {isSelected
            ? `${colorScheme.bg} ${colorScheme.border} border-2`
            : 'hover:bg-gray-50 border-2 border-transparent'}"
        >
          <div class="flex items-center gap-3">
            <span class="text-2xl">{principle.icon}</span>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-900 text-sm truncate {isSelected ? colorScheme.text : ''}">
                {principle.name}
              </h3>
              <p class="text-xs text-gray-500 truncate mt-0.5">{principle.nameEn}</p>
            </div>
            {#if isSelected}
              <span class="{colorScheme.text}">→</span>
            {/if}
          </div>
        </button>
      {/each}
    </nav>

    <div class="p-4 border-t border-gray-200 bg-gray-50">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">💡 활용 가이드</h3>
      <ul class="text-xs text-gray-600 space-y-1">
        <li>• 자가 평가로 강점/개선점 파악</li>
        <li>• 360도 피드백으로 타인 시각 확인</li>
        <li>• 분기별 성장 리뷰 진행</li>
      </ul>
    </div>
  </div>

  <!-- 오른쪽: 상세 내용 -->
  <div class="flex-1 overflow-y-auto bg-gray-50">
    {#if selectedPrinciple}
      <PrincipleDetail principle={selectedPrinciple} />
    {:else}
      <div class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <span class="text-6xl mb-4 block">📋</span>
          <p>왼쪽에서 원칙을 선택하세요</p>
        </div>
      </div>
    {/if}
  </div>
</div>
