// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpxB-pG2-rTv7v-FTEw2S89v_e_t5phww",
  authDomain: "library-app-d71d2.firebaseapp.com",
  projectId: "library-app-d71d2",
  storageBucket: "library-app-d71d2.appspot.com",
  messagingSenderId: "515516023904",
  appId: "1:515516023904:web:ded2ceed267b5429c72f05",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
