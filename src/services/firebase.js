// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuFjqDX-jIUaKYEoRaCAljaiA-BLQgYIA",
  authDomain: "design-dongne.firebaseapp.com",
  projectId: "design-dongne",
  storageBucket: "design-dongne.firebasestorage.app",
  messagingSenderId: "511557827672",
  appId: "1:511557827672:web:eacb0cb6a21f24ede35e2d",
  measurementId: "G-H3PBVMGRCZ"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const db = getFirestore(app);     // 데이터베이스
export const auth = getAuth(app);        // 로그인
export const storage = getStorage(app);  // 이미지 업로드

export default app;