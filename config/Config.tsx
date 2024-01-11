import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

//
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAjj5AD00ZdkYPUAunpTqP5Pnf1hRcHgyQ",
  authDomain: "appmlog-d5b97.firebaseapp.com",
  databaseURL: "https://appmlog-d5b97-default-rtdb.firebaseio.com",
  projectId: "appmlog-d5b97",
  storageBucket: "appmlog-d5b97.appspot.com",
  messagingSenderId: "177893736448",
  appId: "1:177893736448:web:5978064f53d47f198c58e5"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app) // base de datos

export const storage =getStorage(app)

//export const auth = getAuth(app)
////////


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});