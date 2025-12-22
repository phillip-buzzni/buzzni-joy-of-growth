import { writable, derived } from 'svelte/store';

// 현재 로그인한 사용자 정보
export const currentUser = writable(null);

// 로딩 상태
export const authLoading = writable(true);

// 인증 에러
export const authError = writable(null);

// 사용자 권한 (derived store)
export const userRole = derived(currentUser, ($currentUser) => {
  if (!$currentUser) return null;

  // HR/경영진 권한 체크
  const hrTeam = ['hr', 'management', 'executive'];
  if (hrTeam.includes($currentUser.role)) {
    return 'admin';
  }

  // 리더 권한
  if ($currentUser.organization?.isLeader) {
    return 'leader';
  }

  return 'member';
});

// 권한 체크 헬퍼
export const permissions = derived([currentUser, userRole], ([$currentUser, $userRole]) => {
  return {
    // 구성원 목록 조회
    canViewUsers: !!$currentUser,

    // 피드백 작성
    canWriteFeedback: !!$currentUser,

    // 팀원 피드백 결과 조회
    canViewTeamFeedbacks: $userRole === 'leader' || $userRole === 'admin',

    // 전체 피드백 조회
    canViewAllFeedbacks: $userRole === 'admin',

    // Job Matrix 편집
    canEditJobMatrix: $userRole === 'leader' || $userRole === 'admin',

    // 레벨 변경
    canChangeLevel: $userRole === 'admin',

    // 보상 데이터 조회
    canViewSalary: $userRole === 'admin',

    // 인센티브 시뮬레이션
    canSimulateIncentive: $userRole === 'admin',

    // Health Check 개인 결과 조회
    canViewHealthCheckDetails: $userRole === 'admin',

    // OKR 편집
    canEditTeamOKR: $userRole === 'leader' || $userRole === 'admin',
    canEditAllOKR: $userRole === 'admin'
  };
});

/**
 * 로그인
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  authLoading.set(true);
  authError.set(null);

  try {
    // TODO: Firebase Auth 연동
    // const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Mock 구현
    const mockUser = {
      uid: 'mock-user-id',
      email,
      role: 'member',
      organization: {
        isLeader: false
      }
    };

    currentUser.set(mockUser);
    return mockUser;
  } catch (error) {
    authError.set(error.message);
    throw error;
  } finally {
    authLoading.set(false);
  }
}

/**
 * 로그아웃
 */
export async function logout() {
  try {
    // TODO: Firebase Auth 연동
    // await signOut(auth);

    currentUser.set(null);
  } catch (error) {
    authError.set(error.message);
    throw error;
  }
}

/**
 * 인증 상태 초기화
 */
export function initAuth() {
  // TODO: Firebase Auth 상태 리스너
  /*
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Firestore에서 사용자 상세 정보 가져오기
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      currentUser.set({ ...user, ...userDoc.data() });
    } else {
      currentUser.set(null);
    }
    authLoading.set(false);
  });
  */

  // Mock 구현
  setTimeout(() => {
    authLoading.set(false);
  }, 100);
}
