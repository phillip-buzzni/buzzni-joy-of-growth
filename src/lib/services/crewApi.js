// 버즈니 구성원 API 연동
// Mock 데이터와 실제 API를 쉽게 전환할 수 있도록 설계

const API_BASE_URL = 'https://api.buzzni.net/crew/v1';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false'; // 기본값: Mock 사용

/**
 * 구성원 목록 조회
 * @param {string} authToken - 인증 토큰 (실제 API 사용 시 필요)
 * @param {boolean} includeResigned - 퇴사자 포함 여부
 * @returns {Promise<Array>} 구성원 목록
 */
export async function fetchUsers(authToken = null, includeResigned = false) {
  console.log('fetchUsers called, USE_MOCK:', USE_MOCK);

  // Mock 데이터 사용
  if (USE_MOCK) {
    try {
      // 동적 import 사용
      const mockData = await import('../data/mockUsers.json');
      console.log('Mock data loaded:', mockData);

      const results = mockData.default?.results || mockData.results;
      return results
        .filter(user => includeResigned || !user.is_resigned)
        .map(normalizeUser);
    } catch (error) {
      console.error('Failed to load mock data:', error);
      throw error;
    }
  }

  // 실제 API 호출
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?include_resigned=${includeResigned}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results.map(normalizeUser);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

/**
 * API 응답을 내부 데이터 모델로 변환
 * 실제 API 구조에 맞춰 수정됨
 */
function normalizeUser(apiUser) {
  // 스쿼드 리더 여부 확인
  const isSquadLeader = Array.isArray(apiUser.squads) &&
    apiUser.squads.some(squad => squad.division === 'LEADER');

  // 챕터 리더 여부 확인
  const isChapterLeader = apiUser.chapters?.division === 'LEADER';

  return {
    // 기본 ID
    id: apiUser.id,

    // 기본 정보
    basicInfo: {
      realName: apiUser.real_name,
      nickname: apiUser.nickname,
      nicknameKorean: apiUser.nickname_korean,
      email: apiUser.email,
      phone: apiUser.phone,
      gender: apiUser.gender,
      birthDate: apiUser.birth_date
    },

    // 프로필 이미지
    profileImage: {
      normal: apiUser.image_normal,
      small: apiUser.image_small
    },

    // 조직 정보
    organization: {
      // 스쿼드 (여러 개 가능)
      squads: Array.isArray(apiUser.squads)
        ? apiUser.squads.map(squad => ({
            initial: squad.initial,
            name: squad.name,
            koreanName: squad.korean_name,
            division: squad.division, // LEADER or MEMBER
            isLeader: squad.division === 'LEADER'
          }))
        : [],

      // 챕터 (1개만)
      chapter: apiUser.chapters ? {
        initial: apiUser.chapters.initial,
        name: apiUser.chapters.name,
        koreanName: apiUser.chapters.korean_name,
        division: apiUser.chapters.division,
        isLeader: apiUser.chapters.division === 'LEADER'
      } : null,

      // 직무
      occupation: apiUser.occupation,
      occupationKorean: apiUser.occupation_korean,

      // 리더 여부 (스쿼드 또는 챕터 리더)
      isLeader: isSquadLeader || isChapterLeader,
      isSquadLeader,
      isChapterLeader
    },

    // 근무 정보
    workspace: {
      floor: apiUser.floor,
      seat: apiUser.seat,
      workType: apiUser.work_type
    },

    // 입사/퇴사
    employment: {
      joinDate: apiUser.join_date,
      isResigned: apiUser.is_resigned
    },

    // 시스템 필드 (초기값, 추후 Firestore에서 관리)
    currentLevel: apiUser.currentLevel || determineInitialLevel(apiUser),

    // 타임스탬프
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

/**
 * 초기 레벨 자동 판단 (경력/직급 기반)
 * 추후 수동 조정 가능
 */
function determineInitialLevel(apiUser) {
  const occupation = apiUser.occupation?.toLowerCase();
  const joinDate = new Date(apiUser.join_date);
  const yearsOfService = (new Date() - joinDate) / (1000 * 60 * 60 * 24 * 365);

  // 경영진
  if (occupation === 'ceo' || occupation === 'caio') {
    return 'L10';
  }

  // 리더급
  const isLeader = apiUser.chapters?.division === 'LEADER' ||
    (Array.isArray(apiUser.squads) && apiUser.squads.some(s => s.division === 'LEADER'));

  if (isLeader) {
    if (yearsOfService >= 8) return 'L7';
    if (yearsOfService >= 6) return 'L6';
    return 'L5';
  }

  // 일반 구성원 (연차 기반 추정)
  if (yearsOfService >= 6) return 'L5';
  if (yearsOfService >= 4) return 'L4';
  if (yearsOfService >= 2) return 'L3';
  if (yearsOfService >= 1) return 'L2';
  return 'L1';
}

/**
 * Firestore에 구성원 데이터 동기화
 * @param {Object} db - Firestore 인스턴스
 * @param {Array} users - 구성원 목록
 */
export async function syncUsersToFirestore(db, users) {
  const batch = [];

  for (const user of users) {
    const userRef = db.collection('users').doc(user.id);
    batch.push(
      userRef.set(user, { merge: true })
    );
  }

  try {
    await Promise.all(batch);
    console.log(`Successfully synced ${users.length} users to Firestore`);
    return { success: true, count: users.length };
  } catch (error) {
    console.error('Failed to sync users to Firestore:', error);
    throw error;
  }
}

/**
 * 구성원 ID로 상세 정보 조회
 * @param {string} authToken
 * @param {string} userId
 */
export async function fetchUserById(authToken, userId) {
  // Mock 데이터 사용
  if (USE_MOCK) {
    const user = mockData.results.find(u => u.id === userId);
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }
    return Promise.resolve(normalizeUser(user));
  }

  // 실제 API 호출
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return normalizeUser(await response.json());
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

/**
 * Mock/Real API 전환
 * .env 파일에서 VITE_USE_MOCK_DATA=false 설정하면 실제 API 사용
 */
export function isUsingMockData() {
  return USE_MOCK;
}
