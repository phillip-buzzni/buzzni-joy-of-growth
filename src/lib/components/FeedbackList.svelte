<script>
  import { sampleFeedbackRequests, sampleFeedbackResponses, feedbackCycles, feedbackTypes, feedbackStatusColors, statusLabels } from '$lib/data/feedbackData';
  import mockUsers from '$lib/data/mockUsers.json';
  import FeedbackCard from './FeedbackCard.svelte';
  import FeedbackRequestModal from './FeedbackRequestModal.svelte';
  import FeedbackForm from './FeedbackForm.svelte';
  import FeedbackDetail from './FeedbackDetail.svelte';

  let { onSelectFeedback, onCreateRequest } = $props();

  let showRequestModal = $state(false);
  let showFeedbackForm = $state(false);
  let showFeedbackDetail = $state(false);
  let currentRequest = $state(null);

  let selectedCycle = $state('2025-q1');
  let selectedTab = $state('received'); // received, given, pending
  let selectedType = $state('all'); // all, upward, downward, peer, self

  // 현재 사용자 (데모용 - peter)
  const currentUserId = '100925427819464696032';

  // 필터링된 피드백 요청
  let filteredRequests = $derived(() => {
    let requests = sampleFeedbackRequests.filter(req => req.cycleId === selectedCycle);

    if (selectedTab === 'received') {
      requests = requests.filter(req => req.targetId === currentUserId);
    } else if (selectedTab === 'given') {
      requests = requests.filter(req => req.requesterId === currentUserId);
    } else if (selectedTab === 'pending') {
      requests = requests.filter(req =>
        (req.requesterId === currentUserId || req.targetId === currentUserId) &&
        req.status === 'pending'
      );
    }

    if (selectedType !== 'all') {
      requests = requests.filter(req => req.type === selectedType);
    }

    return requests;
  });

  // 통계
  let stats = $derived(() => {
    const all = sampleFeedbackRequests.filter(req => req.cycleId === selectedCycle);
    const received = all.filter(req => req.targetId === currentUserId);
    const given = all.filter(req => req.requesterId === currentUserId);
    const pending = all.filter(req =>
      (req.requesterId === currentUserId || req.targetId === currentUserId) &&
      req.status === 'pending'
    );
    const completed = all.filter(req =>
      (req.requesterId === currentUserId || req.targetId === currentUserId) &&
      req.status === 'completed'
    );

    return { received, given, pending, completed };
  });

  function handleFeedbackClick(request) {
    currentRequest = request;

    // 대기 중이고 내가 작성해야 하는 경우 폼 표시
    if (request.status === 'pending' && request.requesterId === currentUserId) {
      showFeedbackForm = true;
    } else if (request.status === 'completed') {
      // 완료된 경우 상세 보기
      const response = sampleFeedbackResponses.find(r => r.requestId === request.id);
      if (response) {
        currentRequest = { ...request, ...response };
        showFeedbackDetail = true;
      }
    }
  }

  function handleCreateRequest() {
    showRequestModal = true;
  }

  function handleRequestSubmit(data) {
    console.log('피드백 요청 생성:', data);
    showRequestModal = false;
    // TODO: API 연동
  }

  function handleFeedbackSubmit(data) {
    console.log('피드백 제출:', data);
    showFeedbackForm = false;
    currentRequest = null;
    // TODO: API 연동
  }

  function handleBack() {
    showFeedbackForm = false;
    showFeedbackDetail = false;
    currentRequest = null;
  }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3">360° 피드백</h1>
      <p class="text-gray-600">
        동료들과 피드백을 주고받으며 함께 성장합니다.
      </p>
    </div>
    <button
      onclick={handleCreateRequest}
      class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      + 피드백 요청하기
    </button>
  </div>

  <!-- Cycle Selector -->
  <div class="mb-6">
    <label class="text-sm font-medium text-gray-700 mb-2 block">피드백 사이클</label>
    <select
      bind:value={selectedCycle}
      class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      {#each feedbackCycles as cycle}
        <option value={cycle.id}>{cycle.name}</option>
      {/each}
    </select>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">{stats().received.length}</div>
      <div class="text-sm text-gray-600">받은 요청</div>
    </div>
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">{stats().given.length}</div>
      <div class="text-sm text-gray-600">보낸 요청</div>
    </div>
    <div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
      <div class="text-2xl font-bold text-yellow-700">{stats().pending.length}</div>
      <div class="text-sm text-yellow-600">대기 중</div>
    </div>
    <div class="bg-green-50 rounded-lg border border-green-200 p-4">
      <div class="text-2xl font-bold text-green-700">{stats().completed.length}</div>
      <div class="text-sm text-green-600">완료</div>
    </div>
  </div>

  <!-- Tabs -->
  <div class="mb-6">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex gap-8">
        <button
          onclick={() => selectedTab = 'received'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedTab === 'received' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          받은 요청 ({stats().received.length})
        </button>
        <button
          onclick={() => selectedTab = 'given'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedTab === 'given' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          보낸 요청 ({stats().given.length})
        </button>
        <button
          onclick={() => selectedTab = 'pending'}
          class="py-4 px-1 border-b-2 font-medium text-sm transition-colors {selectedTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          대기 중 ({stats().pending.length})
        </button>
      </nav>
    </div>
  </div>

  <!-- Type Filter -->
  <div class="mb-6">
    <label class="text-sm font-medium text-gray-700 mb-2 block">피드백 유형</label>
    <div class="flex gap-2 flex-wrap">
      <button
        onclick={() => selectedType = 'all'}
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        전체
      </button>
      {#each Object.entries(feedbackTypes) as [key, type]}
        <button
          onclick={() => selectedType = key}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          <span class="mr-1">{type.icon}</span>
          {type.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Feedback List -->
  {#if filteredRequests().length > 0}
    <div class="grid gap-4">
      {#each filteredRequests() as request (request.id)}
        <FeedbackCard {request} onClick={() => handleFeedbackClick(request)} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500">해당하는 피드백 요청이 없습니다.</p>
    </div>
  {/if}

  <!-- Guide -->
  <div class="mt-12 p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200">
    <h2 class="text-lg font-bold text-gray-900 mb-3">💡 360° 피드백 가이드</h2>
    <ul class="space-y-2 text-gray-700 text-sm">
      <li>• <strong>상향 피드백:</strong> 팀원이 리더에게 주는 피드백 (익명 가능)</li>
      <li>• <strong>하향 피드백:</strong> 리더가 팀원에게 주는 피드백</li>
      <li>• <strong>동료 피드백:</strong> 같은 레벨의 동료끼리 주는 피드백</li>
      <li>• <strong>건설적 피드백:</strong> 구체적인 사례와 함께 개선점을 제안하세요</li>
      <li>• <strong>정기적 실시:</strong> 분기별로 피드백을 주고받으며 지속적으로 성장합니다</li>
    </ul>
  </div>
</div>

<!-- Modals -->
<FeedbackRequestModal
  isOpen={showRequestModal}
  onClose={() => showRequestModal = false}
  onSubmit={handleRequestSubmit}
/>

{#if showFeedbackForm && currentRequest}
  <FeedbackForm
    request={currentRequest}
    onBack={handleBack}
    onSubmit={handleFeedbackSubmit}
  />
{/if}

{#if showFeedbackDetail && currentRequest}
  <FeedbackDetail
    feedback={currentRequest}
    onBack={handleBack}
  />
{/if}
