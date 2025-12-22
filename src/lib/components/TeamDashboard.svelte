<script>
  import {
    teamStats,
    squadOverview,
    chapterOverview,
    levelDistribution,
    companyOKRStatus,
    feedbackActivity,
    meetingActivity,
    growthActivities,
    recentHighlights,
    attentionNeeded
  } from '../data/teamDashboardData.js';
  import {
    getSquadParticipation,
    getNetworkGraphData,
    getOverloadedMembers,
    getSquadDistribution,
    getChapterSquadParticipation
  } from '../data/participationData.js';
  import NetworkGraph from './NetworkGraph.svelte';

  let selectedView = $state('overview'); // overview, squads, chapters, people, participation

  // Participation data
  let networkData = $derived(() => getNetworkGraphData());
  let overloadedData = $derived(() => getOverloadedMembers());
  let squadDistribution = $derived(() => getSquadDistribution());
  let chapterParticipation = $derived(() => getChapterSquadParticipation());

  function getHealthColor(health) {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'at-risk': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  }

  function getHealthLabel(health) {
    switch (health) {
      case 'healthy': return '건강';
      case 'at-risk': return '주의';
      case 'critical': return '위험';
      default: return '-';
    }
  }

  function getTechDebtColor(level) {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  function getPriorityColor(priority) {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  function getImpactIcon(impact) {
    switch (impact) {
      case 'high': return '🔥';
      case 'medium': return '⭐';
      case 'low': return '✨';
      default: return '📌';
    }
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-3">팀 현황 대시보드</h1>
    <p class="text-gray-600">
      전사 조직과 팀의 성과 및 성장을 한눈에 확인하세요.
    </p>
  </div>

  <!-- Tabs -->
  <div class="mb-8">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex gap-8">
        <button
          onclick={() => selectedView = 'overview'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedView === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          전체 현황
        </button>
        <button
          onclick={() => selectedView = 'squads'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedView === 'squads' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          스쿼드
        </button>
        <button
          onclick={() => selectedView = 'chapters'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedView === 'chapters' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          챕터
        </button>
        <button
          onclick={() => selectedView = 'people'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedView === 'people' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          인력 현황
        </button>
        <button
          onclick={() => selectedView = 'participation'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedView === 'participation' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          참여 현황
        </button>
      </nav>
    </div>
  </div>

  {#if selectedView === 'overview'}
    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div class="text-sm opacity-90 mb-1">전체 인원</div>
        <div class="text-4xl font-bold mb-2">{teamStats.totalMembers}</div>
        <div class="text-sm opacity-75">+{teamStats.growth.percentage}% 지난 분기 대비</div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-sm text-gray-600 mb-1">OKR 평균 진행률</div>
        <div class="text-3xl font-bold text-gray-900 mb-2">{companyOKRStatus.avgProgress}%</div>
        <div class="text-sm text-green-600">{companyOKRStatus.onTrack}개 순조롭게 진행</div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-sm text-gray-600 mb-1">피드백 평균 점수</div>
        <div class="text-3xl font-bold text-gray-900 mb-2">{feedbackActivity.avgScore}</div>
        <div class="text-sm text-gray-500">/ 5.0</div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-sm text-gray-600 mb-1">1:1 미팅 (이번 달)</div>
        <div class="text-3xl font-bold text-gray-900 mb-2">{meetingActivity.thisMonth}</div>
        <div class="text-sm text-green-600">{meetingActivity.completionRate}% 완료율</div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Attention Needed -->
        {#if attentionNeeded.length > 0}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">⚠️ 주의 필요 사항</h2>
            <div class="space-y-3">
              {#each attentionNeeded as item}
                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-0.5 text-xs rounded-full {getPriorityColor(item.priority)}">
                          {item.priority === 'high' ? '높음' : item.priority === 'medium' ? '중간' : '낮음'}
                        </span>
                        <span class="text-xs text-gray-500">{item.affectedTeam}</span>
                      </div>
                      <h3 class="font-medium text-gray-900">{item.title}</h3>
                      <p class="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 mt-2">마감: {new Date(item.dueDate).toLocaleDateString('ko-KR')}</div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Recent Highlights -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">🎉 최근 하이라이트</h2>
          <div class="space-y-4">
            {#each recentHighlights.slice(0, 5) as highlight}
              <div class="flex gap-4">
                <div class="text-2xl">{getImpactIcon(highlight.impact)}</div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm text-gray-500 mb-1">{new Date(highlight.date).toLocaleDateString('ko-KR')}</div>
                  <div class="font-medium text-gray-900">{highlight.title}</div>
                  <div class="text-sm text-gray-600">{highlight.description}</div>
                  {#if highlight.squad || highlight.chapter}
                    <div class="text-xs text-gray-500 mt-1">
                      {highlight.squad ? `👥 ${highlight.squad}` : `📚 ${highlight.chapter}`}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Squad Overview -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">스쿼드 현황</h2>
          <div class="space-y-4">
            {#each squadOverview as squad}
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="font-medium text-gray-900">{squad.name}</h3>
                    <div class="text-sm text-gray-500">{squad.memberCount}명</div>
                  </div>
                  <span class="px-3 py-1 text-xs rounded-full border {getHealthColor(squad.health)}">
                    {getHealthLabel(squad.health)}
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div class="text-gray-500 mb-1">OKR 진행률</div>
                    <div class="font-medium text-gray-900">{squad.okrProgress}%</div>
                  </div>
                  <div>
                    <div class="text-gray-500 mb-1">피드백 점수</div>
                    <div class="font-medium text-gray-900">{squad.avgFeedbackScore}</div>
                  </div>
                  <div>
                    <div class="text-gray-500 mb-1">진행 중 프로젝트</div>
                    <div class="font-medium text-gray-900">{squad.activeProjects}개</div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Activity Stats -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">활동 통계</h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">피드백 완료율</span>
                <span class="font-medium text-gray-900">{Math.round(feedbackActivity.completed / feedbackActivity.totalRequests * 100)}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full" style="width: {feedbackActivity.completed / feedbackActivity.totalRequests * 100}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">미팅 완료율</span>
                <span class="font-medium text-gray-900">{meetingActivity.completionRate}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: {meetingActivity.completionRate}%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">액션 아이템 완료</span>
                <span class="font-medium text-gray-900">{meetingActivity.actionItemCompletion}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-500 rounded-full" style="width: {meetingActivity.actionItemCompletion}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Growth Activities -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">성장 활동</h2>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">학습 시간 (이번 분기)</span>
              <span class="font-medium text-gray-900">{growthActivities.learningHours}시간</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">1인당 평균</span>
              <span class="font-medium text-gray-900">{growthActivities.avgPerPerson}시간</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">완료된 코스</span>
              <span class="font-medium text-gray-900">{growthActivities.completedCourses}개</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">자격증 취득</span>
              <span class="font-medium text-gray-900">{growthActivities.certifications}개</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">테크 토크</span>
              <span class="font-medium text-gray-900">{growthActivities.techTalks}회</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">스터디 그룹</span>
              <span class="font-medium text-gray-900">{growthActivities.studyGroups}개</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">멘토링</span>
              <span class="font-medium text-gray-900">{growthActivities.mentorships}쌍</span>
            </div>
          </div>
        </div>

        <!-- Level Distribution -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">레벨 분포</h2>
          <div class="space-y-3">
            {#each levelDistribution as level}
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600">{level.level}</span>
                  <span class="font-medium text-gray-900">{level.count}명 ({level.percentage}%)</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full" style="width: {level.percentage}%"></div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else if selectedView === 'squads'}
    <!-- Squads Detail View -->
    <div class="grid gap-6">
      {#each squadOverview as squad}
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1">{squad.name}</h2>
              <div class="text-gray-600">{squad.memberCount}명 · {squad.activeProjects}개 프로젝트 진행 중</div>
            </div>
            <span class="px-3 py-1 text-sm rounded-full border {getHealthColor(squad.health)}">
              {getHealthLabel(squad.health)}
            </span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 mb-1">{squad.okrProgress}%</div>
              <div class="text-xs text-gray-500">OKR 진행률</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 mb-1">{squad.avgFeedbackScore}</div>
              <div class="text-xs text-gray-500">피드백 점수</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 mb-1">{squad.activeProjects}</div>
              <div class="text-xs text-gray-500">진행 중</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 mb-1">{squad.completedMilestones}</div>
              <div class="text-xs text-gray-500">완료 마일스톤</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-2xl font-bold text-gray-900 mb-1">{squad.upcomingDeadlines}</div>
              <div class="text-xs text-gray-500">예정 마감</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if selectedView === 'chapters'}
    <!-- Chapters Detail View -->
    <div class="grid gap-6">
      {#each chapterOverview as chapter}
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1">{chapter.name}</h2>
              <div class="text-gray-600">{chapter.memberCount}명 · 평균 레벨 {chapter.avgSkillLevel}</div>
            </div>
            <span class="px-3 py-1 text-sm rounded-full {getTechDebtColor(chapter.techDebt)} bg-opacity-10">
              기술부채: {chapter.techDebt === 'low' ? '낮음' : chapter.techDebt === 'medium' ? '중간' : '높음'}
            </span>
          </div>
          <div class="mb-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">진행 중인 이니셔티브</h3>
            <div class="flex flex-wrap gap-2">
              {#each chapter.ongoingInitiatives as initiative}
                <span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {initiative}
                </span>
              {/each}
            </div>
          </div>
          <div class="text-sm text-gray-600">
            학습 활동: {chapter.learningActivities}개
          </div>
        </div>
      {/each}
    </div>
  {:else if selectedView === 'people'}
    <!-- People Stats View -->
    <div class="grid gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">인력 통계</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-900 mb-1">{teamStats.totalMembers}</div>
            <div class="text-sm text-gray-500">전체 인원</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-900 mb-1">{teamStats.squads}</div>
            <div class="text-sm text-gray-500">스쿼드</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-900 mb-1">{teamStats.chapters}</div>
            <div class="text-sm text-gray-500">챕터</div>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-gray-900 mb-1">{teamStats.newHires}</div>
            <div class="text-sm text-gray-500">신규 입사 (3개월)</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">레벨 분포</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {#each levelDistribution as level}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="text-center mb-2">
                <div class="text-2xl font-bold text-gray-900">{level.count}</div>
                <div class="text-sm text-gray-500">{level.level}</div>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: {level.percentage}%"></div>
              </div>
              <div class="text-xs text-gray-500 text-center mt-1">{level.percentage}%</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else if selectedView === 'participation'}
    <!-- Participation View -->
    <div class="space-y-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="text-2xl font-bold text-gray-900">{overloadedData().stats.total}</div>
          <div class="text-sm text-gray-600">전체 인원</div>
        </div>
        <div class="bg-red-50 rounded-lg border border-red-200 p-4">
          <div class="text-2xl font-bold text-red-700">{overloadedData().stats.overloaded}</div>
          <div class="text-sm text-red-600">과부하 (3개 이상)</div>
        </div>
        <div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
          <div class="text-2xl font-bold text-yellow-700">{overloadedData().stats.multiSquad}</div>
          <div class="text-sm text-yellow-600">복수 스쿼드 (2개)</div>
        </div>
        <div class="bg-green-50 rounded-lg border border-green-200 p-4">
          <div class="text-2xl font-bold text-green-700">{overloadedData().stats.singleSquad}</div>
          <div class="text-sm text-green-600">단일 스쿼드</div>
        </div>
      </div>

      <!-- Network Graph -->
      <NetworkGraph nodes={networkData().nodes} links={networkData().links} />

      <!-- Overloaded Members -->
      {#if overloadedData().overloaded.length > 0}
        <div class="bg-white rounded-lg shadow-sm border border-red-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">⚠️ 과부하 인원 ({overloadedData().overloaded.length}명)</h2>
          <div class="space-y-3">
            {#each overloadedData().overloaded as member}
              <div class="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <img src={member.image} alt={member.name} class="w-12 h-12 rounded-full" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="font-medium text-gray-900">{member.name}</h3>
                    <span class="px-2 py-0.5 bg-red-600 text-white rounded-full text-xs font-bold">
                      {member.squadCount}개 스쿼드
                    </span>
                    {#if member.leaderOf.length > 0}
                      <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {member.leaderOf.length}개 리더
                      </span>
                    {/if}
                  </div>
                  <div class="text-sm text-gray-600 mb-2">{member.chapter}</div>
                  <div class="flex flex-wrap gap-2">
                    {#each member.squads as squad}
                      <span class="px-2 py-1 bg-white border border-red-300 text-red-700 rounded text-xs">
                        {squad}
                        {#if member.leaderOf.includes(squad)}
                          <span class="ml-1 font-bold">👑</span>
                        {/if}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Multi Squad Members -->
      {#if overloadedData().multiSquad.length > 0}
        <div class="bg-white rounded-lg shadow-sm border border-yellow-200 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-4">복수 스쿼드 참여 ({overloadedData().multiSquad.length}명)</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {#each overloadedData().multiSquad as member}
              <div class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <img src={member.image} alt={member.name} class="w-10 h-10 rounded-full" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-medium text-gray-900">{member.name}</h3>
                    <span class="px-2 py-0.5 bg-yellow-600 text-white rounded-full text-xs">
                      {member.squadCount}개
                    </span>
                  </div>
                  <div class="text-xs text-gray-600">{member.squads.join(', ')}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Squad Distribution -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">스쿼드별 인원 현황</h2>
        <div class="space-y-3">
          {#each squadDistribution() as squad}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">{squad.name}</h3>
                <div class="flex items-center gap-3 text-sm">
                  <span class="text-blue-600">👑 {squad.leaders}명</span>
                  <span class="text-gray-600">👥 {squad.members}명</span>
                  <span class="font-bold text-gray-900">총 {squad.total}명</span>
                </div>
              </div>
              <div class="flex gap-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="bg-blue-500"
                  style="width: {(squad.leaders / squad.total) * 100}%"
                  title="리더: {squad.leaders}명"
                ></div>
                <div
                  class="bg-green-500"
                  style="width: {(squad.members / squad.total) * 100}%"
                  title="멤버: {squad.members}명"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Chapter Squad Participation -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">챕터별 스쿼드 참여 현황</h2>
        <div class="space-y-4">
          {#each chapterParticipation() as chapter}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">{chapter.name}</h3>
                <div class="text-sm text-gray-600">
                  {chapter.members}명 · 평균 {chapter.avgSquadCount}개 스쿼드
                </div>
              </div>
              <div class="flex flex-wrap gap-2">
                {#each Object.entries(chapter.squadParticipation) as [squad, count]}
                  <span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    {squad}: {count}명
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
