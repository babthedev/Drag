// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd8ennpPe2A5cUAj6pl-PvIUQ-g3mq5LI",
  authDomain: "drag-dddda.firebaseapp.com",
  projectId: "drag-dddda",
  storageBucket: "drag-dddda.appspot.com",
  messagingSenderId: "724893878116",
  appId: "1:724893878116:web:37164f8f4255152fc89c71",
  measurementId: "G-L9551Y19TK"
};

// Initialize Firebase
export default firebaseConfig;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
