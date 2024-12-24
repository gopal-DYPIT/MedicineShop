import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBiZg7GzxwBvUbVPxKE38ys53e9rbKZ8_c",
  authDomain: "authphoneotp-a7bff.firebaseapp.com",
  projectId: "authphoneotp-a7bff",
  storageBucket: "authphoneotp-a7bff.firebasestorage.app",
  messagingSenderId: "866799131142",
  appId: "1:866799131142:web:881ddba0023d0936a30187",
  measurementId: "G-MZL3ELK5C1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  console.error('Persistence error:', err);
});


// Optional: Configure auth settings
auth.languageCode = "en";
auth.settings.appVerificationDisabledForTesting = false; // Set true only for testing

export default app;
