<script>
  import { meetingTypes, agendaTemplates, meetingFrequency } from '../data/meetingData.js';
  import mockUsers from '../data/mockUsers.json';

  let { isOpen = false, onClose, onSubmit } = $props();

  const currentUserId = '100925427819464696032';

  let selectedAttendee = $state('');
  let selectedType = $state('regular');
  let selectedDate = $state('');
  let selectedTime = $state('14:00');
  let duration = $state(30);
  let location = $state('Zoom');
  let frequency = $state('weekly');
  let isRecurring = $state(false);
  let agenda = $state([...agendaTemplates.regular]);

  let searchQuery = $state('');

  let filteredUsers = $derived(() => {
    if (!searchQuery) return mockUsers.results.filter(u => u.id !== currentUserId);
    const query = searchQuery.toLowerCase();
    return mockUsers.results
      .filter(u => u.id !== currentUserId)
      .filter(user =>
        user.nickname_korean.toLowerCase().includes(query) ||
        user.name_english.toLowerCase().includes(query) ||
        user.squads?.korean_name?.toLowerCase().includes(query) ||
        user.chapters?.korean_name?.toLowerCase().includes(query)
      );
  });

  let selectedUser = $derived(() => {
    return mockUsers.results.find(u => u.id === selectedAttendee);
  });

  function handleTypeChange(type) {
    selectedType = type;
    agenda = [...agendaTemplates[type] || agendaTemplates.regular];
  }

  function addAgendaItem() {
    agenda = [...agenda, ''];
  }

  function removeAgendaItem(index) {
    agenda = agenda.filter((_, i) => i !== index);
  }

  function updateAgendaItem(index, value) {
    agenda[index] = value;
  }

  function handleSubmit() {
    if (!selectedAttendee || !selectedDate || !selectedTime) {
      alert('참석자, 날짜, 시간을 모두 입력해주세요.');
      return;
    }

    onSubmit({
      attendee: selectedAttendee,
      type: selectedType,
      date: selectedDate,
      time: selectedTime,
      duration,
      location,
      agenda: agenda.filter(item => item.trim() !== ''),
      isRecurring,
      frequency: isRecurring ? frequency : null
    });

    // Reset form
    selectedAttendee = '';
    selectedType = 'regular';
    selectedDate = '';
    selectedTime = '14:00';
    duration = 30;
    location = 'Zoom';
    frequency = 'weekly';
    isRecurring = false;
    agenda = [...agendaTemplates.regular];
    searchQuery = '';
  }

  let minDate = $derived(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
</script>

{#if isOpen}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onclick={onClose}>
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onclick={(e) => e.stopPropagation()}>
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-900">미팅 예약하기</h2>
        <button onclick={onClose} class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        <!-- Attendee Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">참석자</label>

          {#if selectedAttendee}
            <div class="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-2">
              <img src={selectedUser()?.image_small} alt={selectedUser()?.nickname_korean} class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="font-medium text-gray-900">{selectedUser()?.nickname_korean}</div>
                <div class="text-sm text-gray-500">
                  {selectedUser()?.chapters?.korean_name || '-'}
                </div>
              </div>
              <button onclick={() => selectedAttendee = ''} class="text-blue-600 hover:text-blue-700">
                변경
              </button>
            </div>
          {:else}
            <div class="mb-2">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder="이름 또는 팀으로 검색..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div class="border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
              {#each filteredUsers().slice(0, 10) as user}
                <button
                  type="button"
                  class="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onclick={() => { selectedAttendee = user.id; searchQuery = ''; }}
                >
                  <img src={user.image_small} alt={user.nickname_korean} class="w-10 h-10 rounded-full" />
                  <div class="flex-1 text-left">
                    <div class="font-medium text-gray-900">{user.nickname_korean}</div>
                    <div class="text-sm text-gray-500">
                      {user.chapters?.korean_name || '-'}
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Meeting Type -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">미팅 유형</label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            {#each Object.entries(meetingTypes) as [type, info]}
              <button
                type="button"
                class="p-3 border-2 rounded-lg transition-all {selectedType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
                onclick={() => handleTypeChange(type)}
              >
                <div class="text-xl mb-1">{info.icon}</div>
                <div class="text-sm font-medium text-gray-900">{info.name}</div>
              </button>
            {/each}
          </div>
        </div>

        <!-- Date & Time -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">날짜</label>
            <input
              type="date"
              bind:value={selectedDate}
              min={minDate()}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">시간</label>
            <input
              type="time"
              bind:value={selectedTime}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Duration & Location -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">시간 (분)</label>
            <select
              bind:value={duration}
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={15}>15분</option>
              <option value={30}>30분</option>
              <option value={45}>45분</option>
              <option value={60}>60분</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">장소</label>
            <input
              type="text"
              bind:value={location}
              placeholder="Zoom, 회의실 A 등"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Recurring -->
        <div class="mb-6">
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              bind:checked={isRecurring}
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span class="text-sm text-gray-700">정기 미팅으로 설정</span>
          </label>
          {#if isRecurring}
            <select
              bind:value={frequency}
              class="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {#each Object.entries(meetingFrequency) as [key, label]}
                <option value={key}>{label}</option>
              {/each}
            </select>
          {/if}
        </div>

        <!-- Agenda -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">어젠다</label>
          <div class="space-y-2">
            {#each agenda as item, index}
              <div class="flex gap-2">
                <input
                  type="text"
                  value={item}
                  oninput={(e) => updateAgendaItem(index, e.target.value)}
                  placeholder="어젠다 항목..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onclick={() => removeAgendaItem(index)}
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            {/each}
            <button
              type="button"
              onclick={addAgendaItem}
              class="text-sm text-blue-600 hover:text-blue-700"
            >
              + 항목 추가
            </button>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          onclick={onClose}
          class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          취소
        </button>
        <button
          onclick={handleSubmit}
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={!selectedAttendee || !selectedDate || !selectedTime}
        >
          예약하기
        </button>
      </div>
    </div>
  </div>
{/if}
