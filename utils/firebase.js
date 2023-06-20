import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9K21N61IxpYaakY7lF4mtjda_OPhbGmQ',
  authDomain: 'b-fit-6a6d7.firebaseapp.com',
  projectId: 'b-fit-6a6d7',
  storageBucket: 'b-fit-6a6d7.appspot.com',
  messagingSenderId: '821344486984',
  appId: '1:821344486984:web:ff78f9728d1c39f369ba7d',
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
