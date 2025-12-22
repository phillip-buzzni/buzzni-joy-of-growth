<script>
  import { fetchUsers, isUsingMockData } from '$lib/services/crewApi';
  import { onMount } from 'svelte';
  import UserCard from './UserCard.svelte';

  let users = [];
  let loading = true;
  let error = null;
  let searchQuery = '';
  let selectedChapter = '';
  let selectedSquad = '';
  let selectedLevel = '';

  // 필터링된 사용자 목록
  $: filteredUsers = users.filter(user => {
    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName =
        user.basicInfo.realName?.toLowerCase().includes(query) ||
        user.basicInfo.nickname?.toLowerCase().includes(query) ||
        user.basicInfo.nicknameKorean?.includes(query);
      if (!matchesName) return false;
    }

    // 챕터 필터
    if (selectedChapter && user.organization.chapter?.koreanName !== selectedChapter) {
      return false;
    }

    // 스쿼드 필터
    if (selectedSquad) {
      const hasSquad = user.organization.squads?.some(
        squad => squad.koreanName === selectedSquad
      );
      if (!hasSquad) return false;
    }

    // 레벨 필터
    if (selectedLevel && user.currentLevel !== selectedLevel) {
      return false;
    }

    return true;
  });

  // 챕터 목록 추출
  $: chapters = [...new Set(users.map(u => u.organization.chapter?.koreanName).filter(Boolean))].sort();

  // 스쿼드 목록 추출
  $: squads = [...new Set(
    users.flatMap(u => u.organization.squads?.map(s => s.koreanName) || [])
  )].sort();

  // 레벨 목록 추출
  $: levels = [...new Set(users.map(u => u.currentLevel))].sort();

  onMount(async () => {
    console.log('UserList mounted, fetching users...');
    try {
      const fetchedUsers = await fetchUsers();
      console.log('Fetched users:', fetchedUsers);
      users = fetchedUsers;
      loading = false;
    } catch (err) {
      console.error('Error fetching users:', err);
      error = err.message;
      loading = false;
    }
  });
</script>

<div class="max-w-7xl mx-auto p-6">
  <div class="flex items-center gap-4 mb-6">
    <h1 class="text-3xl font-bold text-gray-900">버즈니 크루 목록</h1>
    {#if isUsingMockData()}
      <div class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
        Mock 데이터 사용 중
      </div>
    {/if}
  </div>

  {#if loading}
    <div class="text-center py-12 text-base">로딩 중...</div>
  {:else if error}
    <div class="text-center py-12 text-base text-red-600">에러: {error}</div>
  {:else}
    <div class="flex flex-wrap gap-3 mb-6 items-center">
      <input
        type="text"
        placeholder="이름으로 검색..."
        bind:value={searchQuery}
        class="flex-1 min-w-[200px] px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      />

      <select
        bind:value={selectedSquad}
        class="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      >
        <option value="">전체 스쿼드</option>
        {#each squads as squad}
          <option value={squad}>{squad}</option>
        {/each}
      </select>

      <select
        bind:value={selectedChapter}
        class="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      >
        <option value="">전체 챕터</option>
        {#each chapters as chapter}
          <option value={chapter}>{chapter}</option>
        {/each}
      </select>

      <select
        bind:value={selectedLevel}
        class="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white cursor-pointer focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      >
        <option value="">전체 레벨</option>
        {#each levels as level}
          <option value={level}>{level}</option>
        {/each}
      </select>

      <div class="text-gray-600 text-sm font-medium">
        {filteredUsers.length}명 / 전체 {users.length}명
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each filteredUsers as user (user.id)}
        <UserCard {user} />
      {:else}
        <div class="col-span-full text-center py-12 text-gray-400">
          검색 결과가 없습니다.
        </div>
      {/each}
    </div>
  {/if}
</div>
