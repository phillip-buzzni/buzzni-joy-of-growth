<script>
  import { sampleMeetings, meetingStatus, meetingTypes, meetingStats } from '../data/meetingData.js';
  import mockUsers from '../data/mockUsers.json';
  import MeetingCard from './MeetingCard.svelte';
  import MeetingScheduleModal from './MeetingScheduleModal.svelte';
  import MeetingDetail from './MeetingDetail.svelte';

  let { onSelectMeeting } = $props();

  // 현재 사용자 (데모용 - peter)
  const currentUserId = '100925427819464696032';

  let selectedFilter = $state('all'); // all, scheduled, completed
  let selectedType = $state('all');
  let showScheduleModal = $state(false);
  let showDetail = $state(false);
  let currentMeeting = $state(null);

  let filteredMeetings = $derived(() => {
    let meetings = [...sampleMeetings];

    // 날짜순 정렬 (최신순)
    meetings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 상태 필터
    if (selectedFilter !== 'all') {
      meetings = meetings.filter(m => m.status === selectedFilter);
    }

    // 유형 필터
    if (selectedType !== 'all') {
      meetings = meetings.filter(m => m.type === selectedType);
    }

    return meetings;
  });

  let upcomingMeetings = $derived(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sampleMeetings
      .filter(m => m.status === 'scheduled' && new Date(m.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  });

  function handleMeetingClick(meeting) {
    currentMeeting = meeting;
    showDetail = true;
  }

  function handleScheduleMeeting(data) {
    console.log('미팅 예약:', data);
    showScheduleModal = false;
    // TODO: API 연동
  }

  function handleSaveMeeting(data) {
    console.log('미팅 저장:', data);
    showDetail = false;
    currentMeeting = null;
    // TODO: API 연동
  }

  function handleBackToList() {
    showDetail = false;
    currentMeeting = null;
  }
</script>

{#if showDetail && currentMeeting}
  <MeetingDetail
    meeting={currentMeeting}
    onBack={handleBackToList}
    onSave={handleSaveMeeting}
  />
{:else}
<div class="max-w-7xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3">1:1 미팅</h1>
      <p class="text-gray-600">
        정기적인 1:1 미팅으로 성장을 함께 만들어갑니다.
      </p>
    </div>
    <button
      onclick={() => showScheduleModal = true}
      class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
      + 미팅 예약하기
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-white rounded-lg border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">{meetingStats.thisMonth.total}</div>
      <div class="text-sm text-gray-600">이번 달 미팅</div>
    </div>
    <div class="bg-green-50 rounded-lg border border-green-200 p-4">
      <div class="text-2xl font-bold text-green-700">{meetingStats.thisMonth.completed}</div>
      <div class="text-sm text-green-600">완료</div>
    </div>
    <div class="bg-blue-50 rounded-lg border border-blue-200 p-4">
      <div class="text-2xl font-bold text-blue-700">{meetingStats.thisMonth.scheduled}</div>
      <div class="text-sm text-blue-600">예정</div>
    </div>
    <div class="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
      <div class="text-2xl font-bold text-yellow-700">{meetingStats.actionItems.pending}</div>
      <div class="text-sm text-yellow-600">대기 중 액션</div>
    </div>
  </div>

  <!-- Upcoming Meetings -->
  {#if upcomingMeetings().length > 0}
    <div class="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200 p-6 mb-8">
      <h2 class="text-lg font-bold text-gray-900 mb-4">📅 다가오는 미팅</h2>
      <div class="space-y-3">
        {#each upcomingMeetings() as meeting}
          {@const otherUser = mockUsers.results.find(u =>
            u.id === (meeting.participants.organizer === currentUserId
              ? meeting.participants.attendee
              : meeting.participants.organizer)
          )}
          <button
            onclick={() => handleMeetingClick(meeting)}
            class="w-full flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all text-left"
          >
            {#if otherUser}
              <img src={otherUser.image_small} alt={otherUser.nickname_korean} class="w-12 h-12 rounded-full" />
            {/if}
            <div class="flex-1 min-w-0">
              <div class="font-medium text-gray-900">{meeting.title}</div>
              <div class="text-sm text-gray-500">
                {new Date(meeting.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                · {meeting.time} · {meeting.duration}분
              </div>
            </div>
            <div class="text-2xl">{meetingTypes[meeting.type].icon}</div>
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Filters -->
  <div class="mb-6 flex flex-wrap gap-4">
    <!-- Status Filter -->
    <div>
      <label class="text-sm font-medium text-gray-700 mb-2 block">상태</label>
      <div class="flex gap-2">
        <button
          onclick={() => selectedFilter = 'all'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          전체
        </button>
        <button
          onclick={() => selectedFilter = 'scheduled'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedFilter === 'scheduled' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          예정됨
        </button>
        <button
          onclick={() => selectedFilter = 'completed'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          완료
        </button>
      </div>
    </div>

    <!-- Type Filter -->
    <div>
      <label class="text-sm font-medium text-gray-700 mb-2 block">유형</label>
      <div class="flex gap-2 flex-wrap">
        <button
          onclick={() => selectedType = 'all'}
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors {selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          전체
        </button>
        {#each Object.entries(meetingTypes) as [key, type]}
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
  </div>

  <!-- Meeting List -->
  {#if filteredMeetings().length > 0}
    <div class="space-y-4">
      {#each filteredMeetings() as meeting (meeting.id)}
        <MeetingCard {meeting} onClick={() => handleMeetingClick(meeting)} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500">해당하는 미팅이 없습니다.</p>
    </div>
  {/if}

  <!-- Guide -->
  <div class="mt-12 p-6 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200">
    <h2 class="text-lg font-bold text-gray-900 mb-3">💡 효과적인 1:1 미팅 가이드</h2>
    <ul class="space-y-2 text-gray-700 text-sm">
      <li>• <strong>정기성:</strong> 매주 또는 격주로 정기적인 일정을 유지하세요</li>
      <li>• <strong>사전 준비:</strong> 어젠다를 미리 작성하고 공유하세요</li>
      <li>• <strong>양방향 대화:</strong> 일방적인 보고가 아닌 대화의 시간으로 활용하세요</li>
      <li>• <strong>액션 아이템:</strong> 구체적인 실행 계획을 함께 세우세요</li>
      <li>• <strong>팔로우업:</strong> 지난 미팅의 액션 아이템을 확인하세요</li>
    </ul>
  </div>
</div>

<!-- Modal -->
<MeetingScheduleModal
  isOpen={showScheduleModal}
  onClose={() => showScheduleModal = false}
  onSubmit={handleScheduleMeeting}
/>
{/if}
