<script>
  import { meetingTypes, meetingStatus } from '../data/meetingData.js';
  import mockUsers from '../data/mockUsers.json';

  let { meeting, onClick } = $props();

  const currentUserId = '100925427819464696032';

  let otherUser = $derived(() => {
    const otherId = meeting.participants.organizer === currentUserId
      ? meeting.participants.attendee
      : meeting.participants.organizer;
    return mockUsers.results.find(u => u.id === otherId);
  });

  let isOrganizer = $derived(() => meeting.participants.organizer === currentUserId);

  let daysUntil = $derived(() => {
    if (meeting.status !== 'scheduled') return null;
    const meetingDate = new Date(meeting.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((meetingDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  });

  function getStatusColor(status) {
    switch (status) {
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-gray-50 text-gray-500 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }
</script>

<button
  onclick={onClick}
  class="w-full bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all text-left"
>
  <div class="flex items-start gap-4">
    <!-- User Avatar -->
    {#if otherUser()}
      <img
        src={otherUser().image_small}
        alt={otherUser().nickname_korean}
        class="w-12 h-12 rounded-full flex-shrink-0"
      />
    {/if}

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between mb-2">
        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-gray-900 mb-1">{meeting.title}</h3>
          {#if otherUser()}
            <div class="text-sm text-gray-600">
              {isOrganizer() ? 'with' : 'from'} {otherUser().nickname_korean}
              {#if otherUser().chapters?.korean_name}
                · {otherUser().chapters.korean_name}
              {/if}
            </div>
          {/if}
        </div>
        <span class="px-3 py-1 text-xs rounded-full border {getStatusColor(meeting.status)} ml-4">
          {meetingStatus[meeting.status].name}
        </span>
      </div>

      <!-- Meeting Info -->
      <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
        <div class="flex items-center gap-1">
          <span>{meetingTypes[meeting.type].icon}</span>
          <span>{meetingTypes[meeting.type].name}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(meeting.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{meeting.time} · {meeting.duration}분</span>
        </div>
        {#if meeting.location}
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{meeting.location}</span>
          </div>
        {/if}
      </div>

      <!-- D-day or Action Items -->
      {#if daysUntil() !== null}
        <div class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium">
          {#if daysUntil() === 0}
            🔥 오늘
          {:else if daysUntil() === 1}
            D-1
          {:else if daysUntil() > 0}
            D-{daysUntil()}
          {:else}
            지났음
          {/if}
        </div>
      {:else if meeting.status === 'completed' && meeting.actionItems}
        {@const pending = meeting.actionItems.filter(a => !a.completed).length}
        {@const total = meeting.actionItems.length}
        <div class="text-sm text-gray-600">
          액션 아이템: {total - pending}/{total} 완료
        </div>
      {/if}
    </div>
  </div>
</button>
