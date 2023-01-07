import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDtH_zZvQobhZtFX1YTLsVNaqtJrB0pEfI',
    authDomain: 'chat-group-a3fa6.firebaseapp.com',
    projectId: 'chat-group-a3fa6',
    storageBucket: 'chat-group-a3fa6.appspot.com',
    messagingSenderId: '864179894324',
    appId: '1:864179894324:web:781de075e3938d9426b261',
    measurementId: 'G-8SMQ3C0N34',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
