import { writable, derived } from 'svelte/store';

// 전체 구성원 목록
export const users = writable([]);

// 로딩 상태
export const usersLoading = writable(false);

// 스쿼드 목록 (구성원 데이터에서 추출)
export const squads = derived(users, ($users) => {
  const squadSet = new Set();
  $users.forEach(user => {
    user.organization?.squads?.forEach(squad => {
      if (squad) squadSet.add(squad);
    });
  });
  return Array.from(squadSet).sort();
});

// 챕터 목록
export const chapters = derived(users, ($users) => {
  const chapterSet = new Set();
  $users.forEach(user => {
    if (user.organization?.chapter) {
      chapterSet.add(user.organization.chapter);
    }
  });
  return Array.from(chapterSet).sort();
});

// 레벨별 분포
export const levelDistribution = derived(users, ($users) => {
  const distribution = {};
  $users.forEach(user => {
    const level = user.currentLevel || 'Unknown';
    distribution[level] = (distribution[level] || 0) + 1;
  });
  return distribution;
});

/**
 * 구성원 검색
 * @param {string} query - 검색어
 * @param {Object} filters - 필터 옵션 { squad, chapter, level }
 */
export const searchUsers = derived(users, ($users) => {
  return (query = '', filters = {}) => {
    let filtered = $users;

    // 텍스트 검색
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(user =>
        user.basicInfo?.name?.toLowerCase().includes(lowerQuery) ||
        user.organization?.jobTitle?.toLowerCase().includes(lowerQuery)
      );
    }

    // 스쿼드 필터
    if (filters.squad) {
      filtered = filtered.filter(user =>
        user.organization?.squads?.includes(filters.squad)
      );
    }

    // 챕터 필터
    if (filters.chapter) {
      filtered = filtered.filter(user =>
        user.organization?.chapter === filters.chapter
      );
    }

    // 레벨 필터
    if (filters.level) {
      filtered = filtered.filter(user =>
        user.currentLevel === filters.level
      );
    }

    return filtered;
  };
});

/**
 * 특정 사용자 조회
 */
export function getUserById(userId) {
  let result = null;
  users.subscribe(($users) => {
    result = $users.find(u => u.id === userId);
  })();
  return result;
}

/**
 * 스쿼드별 구성원 조회
 */
export function getUsersBySquad(squadName) {
  let result = [];
  users.subscribe(($users) => {
    result = $users.filter(u =>
      u.organization?.squads?.includes(squadName)
    );
  })();
  return result;
}

/**
 * 챕터별 구성원 조회
 */
export function getUsersByChapter(chapterName) {
  let result = [];
  users.subscribe(($users) => {
    result = $users.filter(u =>
      u.organization?.chapter === chapterName
    );
  })();
  return result;
}
