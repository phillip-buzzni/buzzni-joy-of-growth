<script>
  import { meetingTypes, meetingStatus } from '../data/meetingData.js';
  import mockUsers from '../data/mockUsers.json';

  let { meeting, onBack, onSave } = $props();

  const currentUserId = '100925427819464696032';

  let notes = $state(meeting.notes || '');
  let actionItems = $state(meeting.actionItems ? [...meeting.actionItems] : []);
  let isEditing = $state(meeting.status === 'completed' && meeting.notes ? false : true);

  let otherUser = $derived(() => {
    const otherId = meeting.participants.organizer === currentUserId
      ? meeting.participants.attendee
      : meeting.participants.organizer;
    return mockUsers.results.find(u => u.id === otherId);
  });

  let isOrganizer = $derived(() => meeting.participants.organizer === currentUserId);

  function addActionItem() {
    actionItems = [...actionItems, { text: '', completed: false, assignee: currentUserId }];
  }

  function removeActionItem(index) {
    actionItems = actionItems.filter((_, i) => i !== index);
  }

  function toggleActionItem(index) {
    actionItems[index].completed = !actionItems[index].completed;
  }

  function handleSave() {
    onSave({
      meetingId: meeting.id,
      notes,
      actionItems: actionItems.filter(item => item.text.trim() !== '')
    });
    isEditing = false;
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  }
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  <!-- Header -->
  <div class="mb-6">
    <button
      onclick={onBack}
      class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      뒤로 가기
    </button>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-4">
          {#if otherUser()}
            <img
              src={otherUser().image_small}
              alt={otherUser().nickname_korean}
              class="w-16 h-16 rounded-full"
            />
          {/if}
          <div>
            <h1 class="text-2xl font-bold text-gray-900 mb-1">{meeting.title}</h1>
            {#if otherUser()}
              <div class="text-gray-600">
                {isOrganizer() ? 'with' : 'from'} {otherUser().nickname_korean}
                {#if otherUser().chapters?.korean_name}
                  · {otherUser().chapters.korean_name}
                {/if}
              </div>
            {/if}
          </div>
        </div>
        <span class="px-3 py-1 text-sm rounded-full border {meeting.status === 'scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' : meeting.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}">
          {meetingStatus[meeting.status].name}
        </span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <div class="text-gray-500 mb-1">유형</div>
          <div class="font-medium text-gray-900">
            {meetingTypes[meeting.type].icon} {meetingTypes[meeting.type].name}
          </div>
        </div>
        <div>
          <div class="text-gray-500 mb-1">날짜</div>
          <div class="font-medium text-gray-900">{formatDate(meeting.date)}</div>
        </div>
        <div>
          <div class="text-gray-500 mb-1">시간</div>
          <div class="font-medium text-gray-900">{meeting.time} · {meeting.duration}분</div>
        </div>
        <div>
          <div class="text-gray-500 mb-1">장소</div>
          <div class="font-medium text-gray-900">{meeting.location}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Agenda -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <h2 class="text-lg font-bold text-gray-900 mb-4">어젠다</h2>
    <ul class="space-y-2">
      {#each meeting.agenda as item}
        <li class="flex items-start gap-2 text-gray-700">
          <span class="text-blue-600 mt-1">•</span>
          <span>{item}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Meeting Notes -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">미팅 노트</h2>
      {#if meeting.status === 'completed' && !isEditing}
        <button
          onclick={() => isEditing = true}
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          수정
        </button>
      {/if}
    </div>

    {#if isEditing}
      <textarea
        bind:value={notes}
        placeholder="미팅 내용을 마크다운 형식으로 작성하세요...

예시:
## 논의 사항
- 첫 번째 주제
- 두 번째 주제

## 결정 사항
- 결정된 내용

## 다음 스텝
- 액션 아이템"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
        rows="15"
      ></textarea>
    {:else if notes}
      <div class="prose max-w-none text-gray-700 whitespace-pre-wrap">{notes}</div>
    {:else}
      <div class="text-center py-8 text-gray-500">
        아직 작성된 노트가 없습니다.
      </div>
    {/if}
  </div>

  <!-- Action Items -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900">액션 아이템</h2>
      {#if isEditing}
        <button
          onclick={addActionItem}
          class="text-sm text-blue-600 hover:text-blue-700"
        >
          + 추가
        </button>
      {/if}
    </div>

    {#if actionItems.length > 0}
      <div class="space-y-3">
        {#each actionItems as item, index}
          <div class="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              checked={item.completed}
              onchange={() => toggleActionItem(index)}
              class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={!isEditing}
            />
            {#if isEditing}
              <input
                type="text"
                bind:value={item.text}
                placeholder="액션 아이템..."
                class="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onclick={() => removeActionItem(index)}
                class="text-red-600 hover:text-red-700 mt-1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            {:else}
              <span class="flex-1 {item.completed ? 'line-through text-gray-500' : 'text-gray-900'}">{item.text}</span>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-8 text-gray-500">
        아직 액션 아이템이 없습니다.
      </div>
    {/if}
  </div>

  <!-- Actions -->
  {#if isEditing}
    <div class="flex justify-end gap-3">
      <button
        onclick={onBack}
        class="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        취소
      </button>
      <button
        onclick={handleSave}
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        저장
      </button>
    </div>
  {/if}
</div>
