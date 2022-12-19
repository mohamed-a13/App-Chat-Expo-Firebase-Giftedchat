import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const firebaseConfig = {
  apiKey: Constants.expoConfig.datas.APIKEY,
  authDomain: Constants.expoConfig.datas.AUTHDOMAIN,
  projectId: Constants.expoConfig.datas.PROJECTID,
  storageBucket: Constants.expoConfig.datas.STORAGEBUCKET,
  messagingSenderId: Constants.expoConfig.datas.MESSAGINGSENDERID,
  appId: Constants.expoConfig.datas.APPID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const dataBase = getFirestore();
