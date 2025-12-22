// Firebase 초기화 설정
// Firebase 설치 후 활성화: npm install firebase

/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// 서비스 초기화
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app, 'asia-northeast3'); // 서울 리전

export default app;
*/

// 임시 Mock 구현 (Firebase 설치 전)
export const db = {
  collection: (name) => ({
    doc: (id) => ({
      get: async () => ({ exists: () => false, data: () => ({}) }),
      set: async () => {},
      update: async () => {},
      delete: async () => {}
    }),
    get: async () => ({ docs: [] }),
    add: async () => ({ id: 'mock-id' })
  })
};

export const auth = {
  currentUser: null,
  signInWithEmailAndPassword: async () => ({ user: { uid: 'mock-user' } }),
  signOut: async () => {}
};

export const functions = {
  httpsCallable: (name) => async (data) => ({ data: {} })
};
