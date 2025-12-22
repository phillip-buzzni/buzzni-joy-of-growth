<script>
  import mockUsers from '$lib/data/mockUsers.json';
  import { okrCategories, okrStatusColors, statusLabels, okrLevels } from '$lib/data/okrData';

  let { okr, onClick, compact = false } = $props();

  let statusColor = $derived(okrStatusColors[okr.status]);
  let category = $derived(okrCategories[okr.category]);
  let levelInfo = $derived(okrLevels[okr.level]);

  // 참여자 정보 가져오기
  let participants = $derived(() => {
    if (!okr.participants || okr.participants.length === 0) return [];
    return okr.participants
      .map(id => mockUsers.results.find(u => u.id === id))
      .filter(Boolean)
      .slice(0, 5); // 최대 5명까지만 표시
  });

  // Owner 정보 가져오기 (개인 OKR인 경우)
  let owner = $derived(() => {
    if (okr.level === 'personal' && okr.ownerId) {
      return mockUsers.results.find(u => u.id === okr.ownerId);
    }
    return null;
  });
</script>

<div
  class="bg-white rounded-lg border-2 {statusColor.border} {compact ? 'p-4' : 'p-6'} hover:shadow-lg transition-all cursor-pointer"
  onclick={onClick}
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-3">
    <div class="flex items-center gap-2">
      <span class="{compact ? 'text-xl' : 'text-2xl'}">{category.icon}</span>
      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-gray-500">{category.name}</span>
        <span class="text-xs text-gray-400">•</span>
        <span class="text-xs font-medium text-gray-600">{levelInfo.icon} {levelInfo.name}</span>
      </div>
    </div>
    <span class="px-3 py-1 rounded-full text-xs font-semibold {statusColor.badge}">
      {statusLabels[okr.status]}
    </span>
  </div>

  <!-- Owner (개인 OKR인 경우) -->
  {#if owner()}
    <div class="flex items-center gap-2 mb-3">
      <img
        src={owner().image_small}
        alt={owner().nickname_korean}
        class="w-6 h-6 rounded-full border border-gray-200"
      />
      <span class="text-sm font-medium text-gray-700">{owner().nickname_korean}</span>
      <span class="text-xs text-gray-500">({owner().occupation_korean})</span>
    </div>
  {/if}

  <!-- Objective -->
  <h3 class="{compact ? 'text-base' : 'text-lg'} font-bold text-gray-900 mb-2 line-clamp-2">
    {okr.objective}
  </h3>
  <p class="text-sm text-gray-600 mb-3 line-clamp-2">
    {okr.description}
  </p>

  <!-- Squad/Chapter Info -->
  {#if okr.squad || okr.chapter}
    <div class="flex gap-2 mb-3">
      {#if okr.squad}
        <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
          👥 {okr.squad}
        </span>
      {/if}
      {#if okr.chapter}
        <span class="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
          📚 {okr.chapter}
        </span>
      {/if}
    </div>
  {/if}

  <!-- Competency Growth (개인 OKR) -->
  {#if okr.competencyGrowth}
    <div class="mb-3 p-2 bg-amber-50 rounded border border-amber-200">
      <div class="flex items-center gap-2 text-xs">
        <span class="font-semibold text-amber-700">🎓 역량 성장:</span>
        <span class="text-amber-600">{okr.competencyGrowth.focusAreas.join(', ')}</span>
      </div>
    </div>
  {/if}

  <!-- Progress Bar -->
  <div class="mb-4">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs font-medium text-gray-600">전체 진행률</span>
      <span class="text-sm font-bold {statusColor.text}">{okr.progress}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="h-2 rounded-full transition-all {okr.status === 'on-track' ? 'bg-green-500' : okr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'}"
        style="width: {okr.progress}%"
      ></div>
    </div>
  </div>

  <!-- Key Results Summary & Participants -->
  <div class="flex items-center justify-between gap-4">
    <div class="flex items-center gap-4 text-xs text-gray-600">
      <div class="flex items-center gap-1">
        <span class="font-semibold">KR</span>
        <span>{okr.keyResults.length}개</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-green-600">●</span>
        <span>{okr.keyResults.filter(kr => kr.status === 'on-track').length}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-yellow-600">●</span>
        <span>{okr.keyResults.filter(kr => kr.status === 'at-risk').length}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-red-600">●</span>
        <span>{okr.keyResults.filter(kr => kr.status === 'off-track').length}</span>
      </div>
    </div>

    <!-- Participants Avatars -->
    {#if participants().length > 0}
      <div class="flex items-center -space-x-2">
        {#each participants() as participant}
          <img
            src={participant.image_small}
            alt={participant.nickname_korean}
            title={participant.nickname_korean}
            class="w-7 h-7 rounded-full border-2 border-white bg-yellow-300"
          />
        {/each}
        {#if okr.participants && okr.participants.length > 5}
          <div class="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
            +{okr.participants.length - 5}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
