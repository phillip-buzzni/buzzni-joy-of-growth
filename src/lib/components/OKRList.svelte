<script>
  import { push } from 'svelte-spa-router';
  import { sampleOKRs, okrCycles, okrLevels, buildOKRTree } from '$lib/data/okrData';
  import OKRCard from './OKRCard.svelte';

  let selectedCycle = $state('2025-q1');
  let selectedLevel = $state('all'); // all, company, team, personal
  let selectedSquad = $state('all');
  let selectedChapter = $state('all');
  let viewMode = $state('hierarchy'); // hierarchy, flat

  // 전체 스쿼드와 챕터 목록 추출
  let allSquads = $derived(
    [...new Set(sampleOKRs.filter(o => o.squad).map(o => o.squad))].sort()
  );
  let allChapters = $derived(
    [...new Set(sampleOKRs.filter(o => o.chapter).map(o => o.chapter))].sort()
  );

  let filteredOKRs = $derived(
    sampleOKRs.filter(okr => {
      if (okr.cycleId !== selectedCycle) return false;
      if (selectedLevel !== 'all' && okr.level !== selectedLevel) return false;
      if (selectedSquad !== 'all' && okr.squad !== selectedSquad) return false;
      if (selectedChapter !== 'all' && okr.chapter !== selectedChapter) return false;
      return true;
    })
  );

  // 레벨별로 그룹화
  let groupedOKRs = $derived(() => {
    const groups = {
      company: filteredOKRs.filter(o => o.level === 'company'),
      team: filteredOKRs.filter(o => o.level === 'team'),
      personal: filteredOKRs.filter(o => o.level === 'personal')
    };
    return groups;
  });

  // 계층 구조 트리
  let okrTree = $derived(() => buildOKRTree(selectedCycle));

  function handleOKRClick(okr) {
    push(`/okr/${okr.id}`);
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-3">OKR 관리</h1>
    <p class="text-gray-600">
      목표(Objectives)와 핵심 결과(Key Results)를 설정하고 진행 상황을 추적합니다.
    </p>
  </div>

  <!-- Filters -->
  <div class="mb-6 space-y-4">
    <div class="flex gap-4 items-center flex-wrap">
      <!-- Cycle Selector -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-2 block">기간</label>
        <select
          bind:value={selectedCycle}
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {#each okrCycles as cycle}
            <option value={cycle.id}>{cycle.name}</option>
          {/each}
        </select>
      </div>

      <!-- View Mode Toggle -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-2 block">보기 방식</label>
        <div class="flex gap-2">
          <button
            onclick={() => viewMode = 'hierarchy'}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {viewMode === 'hierarchy' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            🌳 계층 구조
          </button>
          <button
            onclick={() => viewMode = 'flat'}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {viewMode === 'flat' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            📋 플랫 뷰
          </button>
        </div>
      </div>

      <!-- Level Filter (flat view only) -->
      {#if viewMode === 'flat'}
        <div>
          <label class="text-sm font-medium text-gray-700 mb-2 block">OKR 레벨</label>
          <div class="flex gap-2">
            <button
              onclick={() => selectedLevel = 'all'}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedLevel === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              전체
            </button>
            <button
              onclick={() => selectedLevel = 'company'}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedLevel === 'company' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              🏢 전사
            </button>
            <button
              onclick={() => selectedLevel = 'team'}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedLevel === 'team' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              👥 팀
            </button>
            <button
              onclick={() => selectedLevel = 'personal'}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedLevel === 'personal' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              👤 개인
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Squad Filter -->
    {#if viewMode === 'flat' && (selectedLevel === 'all' || selectedLevel === 'team' || selectedLevel === 'personal')}
      <div>
        <label class="text-sm font-medium text-gray-700 mb-2 block">스쿼드</label>
        <div class="flex gap-2 flex-wrap">
          <button
            onclick={() => selectedSquad = 'all'}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedSquad === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            전체
          </button>
          {#each allSquads as squad}
            <button
              onclick={() => selectedSquad = squad}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedSquad === squad ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              {squad}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Chapter Filter -->
    {#if viewMode === 'flat' && (selectedLevel === 'all' || selectedLevel === 'team' || selectedLevel === 'personal')}
      <div>
        <label class="text-sm font-medium text-gray-700 mb-2 block">챕터</label>
        <div class="flex gap-2 flex-wrap">
          <button
            onclick={() => selectedChapter = 'all'}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedChapter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            전체
          </button>
          {#each allChapters as chapter}
            <button
              onclick={() => selectedChapter = chapter}
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedChapter === chapter ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
            >
              {chapter}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">{filteredOKRs.length}</div>
      <div class="text-sm text-gray-600">전체 OKR</div>
    </div>
    <div class="bg-green-50 rounded-lg border border-green-200 p-4">
      <div class="text-2xl font-bold text-green-700">
        {filteredOKRs.filter(o => o.status === 'on-track').length}
      </div>
      <div class="text-sm text-green-600">정상 진행</div>
    </div>
    <div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
      <div class="text-2xl font-bold text-yellow-700">
        {filteredOKRs.filter(o => o.status === 'at-risk').length}
      </div>
      <div class="text-sm text-yellow-600">주의 필요</div>
    </div>
    <div class="bg-red-50 rounded-lg border border-red-200 p-4">
      <div class="text-2xl font-bold text-red-700">
        {filteredOKRs.filter(o => o.status === 'off-track').length}
      </div>
      <div class="text-sm text-red-600">지연</div>
    </div>
  </div>

  <!-- OKR List -->
  {#if viewMode === 'hierarchy'}
    <!-- 계층 구조 뷰 -->
    {#if okrTree().length > 0}
      {#each okrTree() as companyOKR (companyOKR.id)}
        <div class="mb-12">
          <!-- 전사 OKR -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="text-2xl">🏢</span>
              <h2 class="text-xl font-bold text-gray-900">전사 OKR</h2>
            </div>
            <OKRCard okr={companyOKR} onClick={() => handleOKRClick(companyOKR)} />
          </div>

          <!-- 팀 OKR들 -->
          {#if companyOKR.children && companyOKR.children.length > 0}
            <div class="ml-8 border-l-4 border-indigo-200 pl-6 space-y-8">
              {#each companyOKR.children as teamOKR (teamOKR.id)}
                <div>
                  <!-- 팀 OKR -->
                  <div class="mb-4">
                    <div class="flex items-center gap-2 mb-3">
                      <span class="text-xl">{teamOKR.ownerType === 'squad' ? '👥' : '📚'}</span>
                      <h3 class="text-lg font-bold text-gray-800">
                        {teamOKR.ownerType === 'squad' ? '스쿼드' : '챕터'} OKR
                        <span class="text-sm font-normal text-gray-500">
                          ({teamOKR.squad || teamOKR.chapter})
                        </span>
                      </h3>
                    </div>
                    <OKRCard okr={teamOKR} onClick={() => handleOKRClick(teamOKR)} />
                  </div>

                  <!-- 개인 OKR들 -->
                  {#if teamOKR.children && teamOKR.children.length > 0}
                    <div class="ml-8 border-l-4 border-purple-200 pl-6">
                      <div class="flex items-center gap-2 mb-3">
                        <span class="text-lg">👤</span>
                        <h4 class="text-base font-bold text-gray-700">개인 OKR ({teamOKR.children.length})</h4>
                      </div>
                      <div class="grid gap-4 md:grid-cols-2">
                        {#each teamOKR.children as personalOKR (personalOKR.id)}
                          <OKRCard okr={personalOKR} onClick={() => handleOKRClick(personalOKR)} compact={true} />
                        {/each}
                      </div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">해당 기간에 등록된 OKR이 없습니다.</p>
      </div>
    {/if}
  {:else}
    <!-- 플랫 뷰 -->
    {#if filteredOKRs.length > 0}
      {#if selectedLevel === 'all'}
        <!-- 레벨별로 그룹화해서 표시 -->
        {#if groupedOKRs().company.length > 0}
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-2xl">🏢</span>
              전사 OKR
              <span class="text-sm font-normal text-gray-500">({groupedOKRs().company.length})</span>
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {#each groupedOKRs().company as okr (okr.id)}
                <OKRCard {okr} onClick={() => handleOKRClick(okr)} />
              {/each}
            </div>
          </div>
        {/if}

        {#if groupedOKRs().team.length > 0}
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-2xl">👥</span>
              팀 OKR
              <span class="text-sm font-normal text-gray-500">({groupedOKRs().team.length})</span>
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {#each groupedOKRs().team as okr (okr.id)}
                <OKRCard {okr} onClick={() => handleOKRClick(okr)} />
              {/each}
            </div>
          </div>
        {/if}

        {#if groupedOKRs().personal.length > 0}
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span class="text-2xl">👤</span>
              개인 OKR
              <span class="text-sm font-normal text-gray-500">({groupedOKRs().personal.length})</span>
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {#each groupedOKRs().personal as okr (okr.id)}
                <OKRCard {okr} onClick={() => handleOKRClick(okr)} />
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <!-- 선택한 레벨만 표시 -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {#each filteredOKRs as okr (okr.id)}
            <OKRCard {okr} onClick={() => handleOKRClick(okr)} />
          {/each}
        </div>
      {/if}
    {:else}
      <div class="text-center py-12">
        <p class="text-gray-500">필터 조건에 맞는 OKR이 없습니다.</p>
      </div>
    {/if}
  {/if}

  <!-- Guide -->
  <div class="mt-12 p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200">
    <h2 class="text-lg font-bold text-gray-900 mb-3">💡 OKR 작성 가이드</h2>

    <div class="space-y-4">
      <div>
        <h3 class="font-semibold text-gray-800 mb-2">📊 OKR 기본 원칙</h3>
        <ul class="space-y-1 text-gray-700 text-sm">
          <li>• <strong>Objective:</strong> 달성하고자 하는 정성적 목표를 명확하고 영감을 주는 문장으로 작성</li>
          <li>• <strong>Key Results:</strong> 목표 달성 여부를 측정할 수 있는 3-5개의 정량적 지표</li>
          <li>• <strong>진행률:</strong> 주간/월간 단위로 정기적으로 업데이트하여 진행 상황 추적</li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-gray-800 mb-2">🌳 계층 구조와 정렬</h3>
        <ul class="space-y-1 text-gray-700 text-sm">
          <li>• <strong>전사 OKR (🏢):</strong> 회사 전체의 전략적 목표, 분기별 최우선 과제</li>
          <li>• <strong>팀 OKR (👥):</strong> 스쿼드/챕터 목표, 전사 OKR 달성에 기여</li>
          <li>• <strong>개인 OKR (👤):</strong> 개인 성과 목표 + 역량 성장 목표, 팀 OKR에 연결</li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold text-gray-800 mb-2">🎯 성과와 역량의 균형</h3>
        <ul class="space-y-1 text-gray-700 text-sm">
          <li>• <strong>성과 중심:</strong> 비즈니스 임팩트와 측정 가능한 결과 지표 (예: MAU 증가, 매출 성장)</li>
          <li>• <strong>역량 성장:</strong> 기술 발표, 문서화, 멘토링 등 장기적 성장 활동 포함</li>
          <li>• <strong>상호 보완:</strong> 성과 달성 과정에서 역량이 성장하고, 역량이 더 큰 성과를 만듦</li>
        </ul>
      </div>
    </div>
  </div>
</div>
