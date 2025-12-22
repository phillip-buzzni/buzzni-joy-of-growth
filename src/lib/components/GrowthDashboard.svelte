<script>
  import {
    growthTimeline,
    competencyScores,
    currentGoals,
    growthInsights,
    achievements,
    recommendedActions,
    benchmarkData
  } from '../data/dashboardData.js';
  import mockUsers from '../data/mockUsers.json';

  // 현재 사용자 (데모용 - peter)
  const currentUserId = '100925427819464696032';
  const currentUser = mockUsers.results.find(u => u.id === currentUserId);

  let selectedPeriod = $state('2025-q1');

  let currentScores = $derived(() => competencyScores[selectedPeriod] || competencyScores['2025-q1']);

  let averageScore = $derived(() => {
    const scores = Object.values(currentScores());
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  });

  function getStatusColor(status) {
    switch (status) {
      case 'on-track': return 'bg-green-50 text-green-700 border-green-200';
      case 'at-risk': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'off-track': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'on-track': return '순조롭게 진행 중';
      case 'at-risk': return '주의 필요';
      case 'off-track': return '지연됨';
      default: return '진행 중';
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

  function getRarityColor(rarity) {
    switch (rarity) {
      case 'platinum': return 'bg-gradient-to-br from-slate-300 to-slate-500';
      case 'gold': return 'bg-gradient-to-br from-yellow-300 to-yellow-500';
      case 'silver': return 'bg-gradient-to-br from-gray-300 to-gray-400';
      case 'bronze': return 'bg-gradient-to-br from-orange-300 to-orange-500';
      default: return 'bg-gray-200';
    }
  }

  function getTimelineColor(color) {
    const colors = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[color] || colors.gray;
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      {#if currentUser}
        <img src={currentUser.image_small} alt={currentUser.nickname_korean} class="w-16 h-16 rounded-full" />
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{currentUser.nickname_korean}님의 성장 대시보드</h1>
          <p class="text-gray-600">
            {currentUser.chapters?.korean_name || '-'} · {currentUser.squads?.korean_name || '-'}
          </p>
        </div>
      {/if}
    </div>
  </div>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
      <div class="text-sm opacity-90 mb-1">종합 점수</div>
      <div class="text-4xl font-bold mb-2">{averageScore()}</div>
      <div class="text-sm opacity-75">/ 5.0</div>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-sm text-gray-600 mb-1">진행 중인 목표</div>
      <div class="text-3xl font-bold text-gray-900 mb-2">{currentGoals.length}</div>
      <div class="text-sm text-green-600">2개 순조롭게 진행 중</div>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-sm text-gray-600 mb-1">받은 피드백</div>
      <div class="text-3xl font-bold text-gray-900 mb-2">12</div>
      <div class="text-sm text-gray-500">이번 분기</div>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-sm text-gray-600 mb-1">획득 뱃지</div>
      <div class="text-3xl font-bold text-gray-900 mb-2">{achievements.length}</div>
      <div class="text-sm text-yellow-600">🏆 최근 1개 획득</div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Left Column -->
    <div class="lg:col-span-2 space-y-6">
      <!-- 역량 점수 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">역량별 점수</h2>
        <div class="space-y-4">
          {#each Object.entries(currentScores()) as [key, score]}
            {@const benchmark = benchmarkData.categories[key]}
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">
                  {key === 'technical' ? '기술 역량' :
                   key === 'collaboration' ? '협업' :
                   key === 'leadership' ? '리더십' :
                   key === 'delivery' ? '실행력' : '성장 마인드'}
                </span>
                <span class="text-sm font-bold text-gray-900">{score.toFixed(1)}</span>
              </div>
              <div class="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="absolute h-full bg-blue-500 rounded-full transition-all"
                  style="width: {(score / 5) * 100}%"
                ></div>
                {#if benchmark}
                  <div
                    class="absolute h-full w-0.5 bg-gray-400"
                    style="left: {(benchmark.team / 5) * 100}%"
                    title="팀 평균: {benchmark.team}"
                  ></div>
                {/if}
              </div>
              {#if benchmark}
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span>팀 평균: {benchmark.team}</span>
                  <span>회사 평균: {benchmark.company}</span>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>

      <!-- 현재 목표 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">진행 중인 목표</h2>
        <div class="space-y-4">
          {#each currentGoals as goal}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-1">{goal.title}</h3>
                  <div class="text-sm text-gray-500">목표일: {new Date(goal.target).toLocaleDateString('ko-KR')}</div>
                </div>
                <span class="px-2 py-1 text-xs rounded-full border {getStatusColor(goal.status)}">
                  {getStatusLabel(goal.status)}
                </span>
              </div>
              <div class="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="absolute h-full {goal.status === 'at-risk' ? 'bg-yellow-500' : goal.status === 'off-track' ? 'bg-red-500' : 'bg-green-500'} rounded-full transition-all"
                  style="width: {goal.progress}%"
                ></div>
              </div>
              <div class="text-right text-sm font-medium text-gray-700 mt-1">{goal.progress}%</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 성장 타임라인 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">최근 활동</h2>
        <div class="space-y-4">
          {#each growthTimeline as item}
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full border-2 {getTimelineColor(item.color)} flex items-center justify-center text-xl">
                  {item.icon}
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm text-gray-500 mb-1">{new Date(item.date).toLocaleDateString('ko-KR')}</div>
                <div class="font-medium text-gray-900">{item.title}</div>
                <div class="text-sm text-gray-600">{item.description}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="space-y-6">
      <!-- 추천 액션 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">추천 액션</h2>
        <div class="space-y-3">
          {#each recommendedActions as action}
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-sm font-medium text-gray-900 flex-1">{action.title}</h3>
                <span class="px-2 py-0.5 text-xs rounded-full {getPriorityColor(action.priority)} ml-2">
                  {action.priority === 'high' ? '높음' : action.priority === 'medium' ? '중간' : '낮음'}
                </span>
              </div>
              <p class="text-xs text-gray-600 mb-2">{action.description}</p>
              <div class="text-xs text-gray-500">마감: {new Date(action.deadline).toLocaleDateString('ko-KR')}</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 성장 인사이트 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">성장 인사이트</h2>
        <div class="space-y-3">
          {#each growthInsights as insight}
            <div class="border-l-4 {insight.type === 'strength' ? 'border-green-500' : insight.type === 'improvement' ? 'border-yellow-500' : insight.type === 'trend' ? 'border-blue-500' : 'border-red-500'} pl-3 py-2">
              <div class="flex items-start gap-2">
                <span class="text-lg">{insight.icon}</span>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900 mb-1">{insight.title}</div>
                  <div class="text-xs text-gray-600">{insight.description}</div>
                  {#if insight.actionable && insight.action}
                    <button class="text-xs text-blue-600 hover:text-blue-700 mt-2">
                      → {insight.action}
                    </button>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- 획득 뱃지 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-4">획득 뱃지</h2>
        <div class="grid grid-cols-2 gap-3">
          {#each achievements as badge}
            <div class="text-center p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div class="w-16 h-16 mx-auto mb-2 rounded-full {getRarityColor(badge.rarity)} flex items-center justify-center text-2xl">
                {badge.icon}
              </div>
              <div class="text-sm font-medium text-gray-900 mb-1">{badge.name}</div>
              <div class="text-xs text-gray-500">{badge.description}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
