<script>
  export let user;
</script>

<div class="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white transition-all hover:shadow-lg hover:-translate-y-0.5">
  <div class="flex-1 flex flex-col gap-4">
    <div class="flex justify-between gap-2">
      <img
        src={user.profileImage.small}
        alt={user.basicInfo.nicknameKorean}
        class="w-12 h-12 rounded-full object-cover bg-yellow-300"
      />
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold text-gray-900">{user.basicInfo.nicknameKorean}</span>
          <span class="text-sm text-gray-600">{user.basicInfo.nickname}</span>
        </div>
        <div class="text-sm text-slate-500">
          {user.organization.occupationKorean}
        </div>    
      </div>
      
      <div class="flex-1 text-xs text-gray-700 flex justify-end">
        <span class="inline-flex px-2 py-0.5 h-5 bg-green-500 text-white rounded-full text-xs font-semibold">{user.currentLevel}</span>
      </div>
    </div>
    

    

    <div class="flex flex-col gap-2">
    <div class="text-slate-400 text-xs">#Sqd.</div>
    {#if user.organization.squads.length > 0}
      <div class="flex flex-wrap gap-1">
        {#each user.organization.squads as squad}
          <span class="inline-block px-2 py-1 rounded text-xs {squad.isLeader ? 'bg-red-50 text-red-700 font-semibold' : 'bg-blue-50 text-blue-700'}">
            {squad.koreanName}
            {#if squad.isLeader}★{/if}
          </span>
        {/each}
      </div>
    {/if}

    <div class="text-slate-400 text-xs">#Ch.</div>
    {#if user.organization.chapter}
      <div class="flex flex-wrap gap-1">
        <span class="inline-block px-2 py-1 rounded text-xs {user.organization.isChapterLeader ? 'bg-purple-100 text-purple-700 font-semibold' : 'bg-gray-100 text-gray-600'}">
          {user.organization.chapter.koreanName}
          {#if user.organization.isChapterLeader}★{/if}
        </span>
      </div>
    {/if}   
  </div> 

    <!-- <div class="text-xs text-gray-400">
      {user.workspace.floor}층 {user.workspace.seat}번
    </div> -->
  </div>
</div>
