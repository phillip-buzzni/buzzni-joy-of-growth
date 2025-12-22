<script>
  import { okrStatusColors, okrCategories, statusLabels, okrLevels, getOKRHierarchy } from '$lib/data/okrData';
  import mockUsers from '$lib/data/mockUsers.json';

  let { okr, onBack } = $props();

  let statusColor = $derived(okrStatusColors[okr.status]);
  let category = $derived(okrCategories[okr.category]);
  let levelInfo = $derived(okrLevels[okr.level]);

  // 계층 구조 정보
  let hierarchy = $derived(() => getOKRHierarchy(okr.id));

  // 참여자 정보 가져오기
  let participants = $derived(() => {
    if (!okr.participants || okr.participants.length === 0) return [];
    return okr.participants
      .map(id => mockUsers.results.find(u => u.id === id))
      .filter(Boolean);
  });

  // Owner 정보 가져오기
  let owner = $derived(() => {
    if (okr.ownerId) {
      return mockUsers.results.find(u => u.id === okr.ownerId);
    }
    return null;
  });
</script>

<div class="max-w-5xl mx-auto px-4 py-8">
  <!-- Back Button -->
  <button
    onclick={onBack}
    class="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
  >
    <span>←</span>
    <span>OKR 목록으로</span>
  </button>

  <!-- Hierarchy Breadcrumb -->
  {#if hierarchy()}
    <div class="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
      <div class="flex items-center gap-2 text-sm">
        <span class="font-semibold text-indigo-700">계층 구조:</span>
        <div class="flex items-center gap-2">
          {#if hierarchy().parent}
            {#if hierarchy().parent.level === 'company'}
              <span class="text-indigo-600">🏢 전사 OKR</span>
            {:else if hierarchy().parent.level === 'team'}
              <span class="text-indigo-600">👥 팀 OKR ({hierarchy().parent.squad || hierarchy().parent.chapter})</span>
            {/if}
            <span class="text-indigo-400">→</span>
          {/if}
          <span class="font-semibold text-indigo-800">{levelInfo.icon} {levelInfo.name} OKR</span>
          {#if hierarchy().children.length > 0}
            <span class="text-indigo-400">→</span>
            <span class="text-indigo-600">{hierarchy().children.length}개 하위 OKR</span>
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- Header -->
  <div class="bg-white rounded-xl border-2 {statusColor.border} p-8 mb-8">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <span class="text-4xl">{category.icon}</span>
        <div>
          <div class="text-sm font-medium text-gray-500">{category.name} • {levelInfo.name}</div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold {statusColor.badge}">
            {statusLabels[okr.status]}
          </span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-4xl font-bold {statusColor.text}">{okr.progress}%</div>
        <div class="text-sm text-gray-600">전체 진행률</div>
      </div>
    </div>

    <h1 class="text-2xl font-bold text-gray-900 mb-3">{okr.objective}</h1>
    <p class="text-gray-700 leading-relaxed mb-4">{okr.description}</p>

    <!-- Owner (개인 OKR) -->
    {#if owner()}
      <div class="mb-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <img
          src={owner().image_small}
          alt={owner().nickname_korean}
          class="w-12 h-12 rounded-full border-2 border-gray-200"
        />
        <div>
          <div class="text-sm font-semibold text-gray-700">담당자</div>
          <div class="text-base font-bold text-gray-900">{owner().nickname_korean}</div>
          <div class="text-xs text-gray-500">{owner().occupation_korean}</div>
        </div>
      </div>
    {/if}

    <!-- Squad/Chapter Info -->
    {#if okr.squad || okr.chapter}
      <div class="flex gap-2 mb-4">
        {#if okr.squad}
          <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            👥 {okr.squad}
          </span>
        {/if}
        {#if okr.chapter}
          <span class="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
            📚 {okr.chapter}
          </span>
        {/if}
      </div>
    {/if}

    <!-- Competency Growth (개인 OKR) -->
    {#if okr.competencyGrowth}
      <div class="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div class="text-sm font-semibold text-amber-800 mb-2">🎓 역량 성장 목표</div>
        <div class="flex items-center gap-2 text-sm text-amber-700">
          <span>목표 레벨: <strong>{okr.competencyGrowth.targetLevel}</strong></span>
          <span class="text-amber-400">•</span>
          <span>집중 영역: <strong>{okr.competencyGrowth.focusAreas.join(', ')}</strong></span>
        </div>
      </div>
    {/if}

    <!-- Related Competencies -->
    {#if okr.relatedCompetencies && okr.relatedCompetencies.length > 0}
      <div class="mb-4">
        <div class="text-sm font-medium text-gray-700 mb-2">연관 역량</div>
        <div class="flex flex-wrap gap-2">
          {#each okr.relatedCompetencies as competency}
            <span class="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">
              {competency}
            </span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Participants -->
    {#if participants().length > 0}
      <div class="mb-6">
        <div class="text-sm font-medium text-gray-700 mb-3">참여 인원 ({participants().length}명)</div>
        <div class="flex flex-wrap gap-3">
          {#each participants() as participant}
            <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={participant.image_small}
                alt={participant.nickname_korean}
                class="w-8 h-8 rounded-full"
              />
              <div>
                <div class="text-sm font-medium text-gray-900">{participant.nickname_korean}</div>
                <div class="text-xs text-gray-500">{participant.chapters?.korean_name || '-'}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Progress Bar -->
    <div class="mt-6">
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="h-3 rounded-full transition-all {okr.status === 'on-track' ? 'bg-green-500' : okr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'}"
          style="width: {okr.progress}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Key Results -->
  <div class="mb-8">
    <h2 class="text-xl font-bold text-gray-900 mb-6">핵심 결과 (Key Results)</h2>
    <div class="space-y-6">
      {#each okr.keyResults as kr, index}
        {@const krStatusColor = okrStatusColors[kr.status]}
        <div class="bg-white rounded-lg border-2 {krStatusColor.border} p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
                  KR {index + 1}
                </span>
                <span class="px-3 py-1 rounded-full text-xs font-semibold {krStatusColor.badge}">
                  {statusLabels[kr.status]}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{kr.description}</h3>
            </div>
            <div class="text-right ml-4">
              <div class="text-3xl font-bold {krStatusColor.text}">{kr.progress}%</div>
            </div>
          </div>

          <!-- Current Progress -->
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">현재 / 목표</span>
              <span class="text-lg font-bold text-gray-900">
                {kr.current} / {kr.target} {kr.unit}
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all {kr.status === 'on-track' ? 'bg-green-500' : kr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'}"
                style="width: {kr.progress}%"
              ></div>
            </div>
          </div>

          <!-- Milestones -->
          {#if kr.milestones && kr.milestones.length > 0}
            <div class="mt-4 pt-4 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">마일스톤</h4>
              <div class="space-y-2">
                {#each kr.milestones as milestone}
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">{milestone.date}</span>
                    <div class="flex items-center gap-3">
                      <span class="text-gray-500">목표: {milestone.target}{kr.unit}</span>
                      <span class="font-semibold {milestone.actual >= milestone.target ? 'text-green-600' : 'text-orange-600'}">
                        실제: {milestone.actual}{kr.unit}
                      </span>
                    </div>
                  </div>
                  {#if milestone.note}
                    <p class="text-xs text-gray-500 ml-4">💬 {milestone.note}</p>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Timeline & Updates -->
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <h2 class="text-xl font-bold text-gray-900 mb-4">📝 업데이트 히스토리</h2>
    <div class="space-y-4">
      <div class="border-l-2 border-blue-500 pl-4 py-2">
        <div class="text-sm font-semibold text-gray-900">2025-02-28</div>
        <p class="text-sm text-gray-700 mt-1">
          전체 진행률 65% 달성. KR1의 MAU가 목표치를 초과하여 순조롭게 진행 중.
          KR2는 마케팅 캠페인 효과로 개선 중.
        </p>
      </div>
      <div class="border-l-2 border-gray-300 pl-4 py-2">
        <div class="text-sm font-semibold text-gray-900">2025-01-31</div>
        <p class="text-sm text-gray-700 mt-1">
          신규 기능 출시 효과로 MAU가 예상보다 빠르게 증가. 첫 달 목표 달성.
        </p>
      </div>
    </div>
  </div>
</div>
