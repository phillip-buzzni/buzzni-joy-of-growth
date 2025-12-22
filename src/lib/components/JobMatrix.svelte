<script>
  import { jobLevels } from '$lib/data/jobMatrix';
  import { jobFamilies } from '$lib/data/jobFamilies';
  import LevelCard from './LevelCard.svelte';
  import LevelDetail from './LevelDetail.svelte';
  import JobMatrixTable from './JobMatrixTable.svelte';

  let selectedLevel = $state(null);
  let viewMode = $state('table'); // 'card' or 'table'
  let selectedFamily = $state('engineering'); // 기본값: 엔지니어링

  function handleLevelClick(level) {
    selectedLevel = level;
  }

  function handleBack() {
    selectedLevel = null;
  }
</script>

{#if selectedLevel}
  <LevelDetail level={selectedLevel} onBack={handleBack} />
{:else}
  <div class="{viewMode === 'table' ? 'w-full px-6 py-6' : 'max-w-7xl mx-auto px-4 py-8'}">
    <div class="mb-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Job Matrix: 직군별 레벨 시스템</h1>
          <p class="text-gray-600 text-sm">
            직군별로 L1부터 L10까지의 레벨 체계와 요구 역량이 정의되어 있습니다.
          </p>
        </div>

        <!-- View Toggle -->
        <div class="flex gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onclick={() => viewMode = 'card'}
            class="px-4 py-2 rounded-md font-medium text-sm transition-colors {viewMode === 'card' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-gray-900'}"
          >
            📇 카드
          </button>
          <button
            onclick={() => viewMode = 'table'}
            class="px-4 py-2 rounded-md font-medium text-sm transition-colors {viewMode === 'table' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:text-gray-900'}"
          >
            📊 표
          </button>
        </div>
      </div>

      <!-- Job Family Selector -->
      <div class="flex gap-2 flex-wrap">
        {#each Object.values(jobFamilies) as family}
          <button
            onclick={() => selectedFamily = family.id}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedFamily === family.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            <span class="mr-1">{family.icon}</span>
            {family.nameKorean}
          </button>
        {/each}
      </div>
    </div>

    {#if viewMode === 'card'}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each jobLevels as level (level.id)}
          <LevelCard {level} onClick={() => handleLevelClick(level)} />
        {/each}
      </div>

      <div class="mt-12 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200">
        <h2 class="text-lg font-bold text-gray-900 mb-3">📊 레벨 시스템 활용 가이드</h2>
        <ul class="space-y-2 text-gray-700">
          <li>• <strong>커리어 플래닝:</strong> 현재 레벨과 목표 레벨을 설정하고 성장 경로를 계획하세요</li>
          <li>• <strong>역량 평가:</strong> 각 레벨의 요구사항을 기준으로 자신의 강점과 개선점을 파악하세요</li>
          <li>• <strong>승진 준비:</strong> 다음 레벨의 역량을 미리 학습하고 실천하여 승진을 준비하세요</li>
          <li>• <strong>멘토링:</strong> 후배들에게 각 레벨별 요구사항을 가이드하고 성장을 도와주세요</li>
        </ul>
      </div>
    {:else}
      <JobMatrixTable family={selectedFamily} onLevelClick={handleLevelClick} />
    {/if}
  </div>
{/if}
