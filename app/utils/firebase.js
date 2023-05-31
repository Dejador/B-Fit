import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDYmTweQCbAxhcBKMVHmNV8LKPckNOSnDc',
  authDomain: 'b-fit-1c509.firebaseapp.com',
  projectId: 'b-fit-1c509',
  storageBucket: 'b-fit-1c509.appspot.com',
  messagingSenderId: '1028000754339',
  appId: '1:1028000754339:web:42385f6c7d152171c3ad16',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithGooglePopup(auth, provider);