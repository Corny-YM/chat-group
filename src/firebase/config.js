import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
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
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

// connectAuthEmulator(auth, 'http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     connectFirestoreEmulator(db, 'localhost', 8080);
// }

export { app, auth, storage, db };
