<script>
  import { feedbackTypes, feedbackStatusColors, statusLabels } from '$lib/data/feedbackData';
  import mockUsers from '$lib/data/mockUsers.json';

  let { request, onClick } = $props();

  let statusColor = $derived(feedbackStatusColors[request.status]);
  let feedbackType = $derived(feedbackTypes[request.type]);

  // 요청자와 대상자 정보
  let requester = $derived(mockUsers.results.find(u => u.id === request.requesterId));
  let target = $derived(mockUsers.results.find(u => u.id === request.targetId));

  // 익명 여부에 따라 표시
  let displayName = $derived(() => {
    if (request.isAnonymous && request.status === 'completed') {
      return '익명';
    }
    return requester?.nickname_korean || '알 수 없음';
  });

  // D-day 계산
  let daysLeft = $derived(() => {
    if (request.status !== 'pending') return null;
    const due = new Date(request.dueDate);
    const today = new Date();
    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    return diff;
  });
</script>

<div
  class="bg-white rounded-lg border-2 {statusColor.border} p-6 hover:shadow-lg transition-all cursor-pointer"
  onclick={onClick}
>
  <div class="flex items-start justify-between mb-4">
    <div class="flex items-center gap-3">
      <!-- 요청자 프로필 -->
      {#if !request.isAnonymous || request.status !== 'completed'}
        <img
          src={requester?.image_small}
          alt={requester?.nickname_korean}
          class="w-12 h-12 rounded-full border-2 border-gray-200"
        />
      {:else}
        <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span class="text-xl">🔒</span>
        </div>
      {/if}

      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-gray-900">{displayName()}</span>
          <span class="text-gray-400">→</span>
          <span class="font-bold text-gray-900">{target?.nickname_korean}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {feedbackType.icon} {feedbackType.name}
          </span>
          {#if request.isAnonymous}
            <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
              🔒 익명
            </span>
          {/if}
        </div>
      </div>
    </div>

    <div class="flex flex-col items-end gap-2">
      <span class="px-3 py-1 rounded-full text-xs font-semibold {statusColor.badge}">
        {statusLabels[request.status]}
      </span>
      {#if daysLeft() !== null}
        {#if daysLeft() > 3}
          <span class="text-xs text-gray-500">D-{daysLeft()}</span>
        {:else if daysLeft() > 0}
          <span class="text-xs text-orange-600 font-medium">D-{daysLeft()}</span>
        {:else if daysLeft() === 0}
          <span class="text-xs text-red-600 font-bold">오늘 마감</span>
        {:else}
          <span class="text-xs text-red-600 font-bold">기한 초과</span>
        {/if}
      {/if}
    </div>
  </div>

  <!-- 날짜 정보 -->
  <div class="flex items-center gap-4 text-xs text-gray-500">
    <div>
      요청일: {new Date(request.requestedAt).toLocaleDateString('ko-KR')}
    </div>
    {#if request.status === 'completed'}
      <div>
        완료일: {new Date(request.completedAt).toLocaleDateString('ko-KR')}
      </div>
    {:else}
      <div>
        마감일: {new Date(request.dueDate).toLocaleDateString('ko-KR')}
      </div>
    {/if}
  </div>
</div>
