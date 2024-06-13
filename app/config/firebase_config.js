// lib/firebase.ts
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA289K4LMVVC9HHv79aOQgxLsAQbAokor4",
    authDomain: "exampleapp-3b09e.firebaseapp.com",
    projectId: "exampleapp-3b09e",
    storageBucket: "exampleapp-3b09e.appspot.com",
    messagingSenderId: "710771976235",
    appId: "1:710771976235:web:8bf29e583dfb352832226e",
    databaseUrl: "https://exampleapp-3b09e-default-rtdb.asia-southeast1.firebasedatabase.app/",
    measurementId: "G-8SVCQ5F2DQ"
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const database = getDatabase();
export const firestore = getFirestore();
