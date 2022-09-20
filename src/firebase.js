// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD78qNNkUDdeQF-M8jrwSaWcB4EKmMWU9E",
  authDomain: "allplants-b080e.firebaseapp.com",
  databaseURL:
    "https://allplants-b080e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "allplants-b080e",
  storageBucket: "allplants-b080e.appspot.com",
  messagingSenderId: "865906622486",
  appId: "1:865906622486:web:14f3b55f98835160a13537",
  measurementId: "G-3LCF0TPRH2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// get a reference to the storage service
export const storage = getStorage(app);
