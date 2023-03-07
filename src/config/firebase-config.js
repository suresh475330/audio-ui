import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app,process.env.REACT_APP_FIREBASE_BUCKET_URL);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt : 'select_account',
})

const auth  = getAuth(app);
const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export {app,storage,auth,signInWithGoogleRedirect};