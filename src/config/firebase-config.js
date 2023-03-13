import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJgzK8aDnOYe0eh2MSP2ZIlzfU9Xux2r0",
  authDomain: "cat-music-player.firebaseapp.com",
  projectId: "cat-music-player",
  storageBucket: "cat-music-player.appspot.com",
  messagingSenderId: "76109110002",
  appId: "1:76109110002:web:f781234fc2295bfdc24e6b"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app,"gs://cat-music-player.appspot.com");

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt : 'select_account',
})

const auth  =  getAuth(app);
const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export {app,storage,auth,signInWithGoogleRedirect};
