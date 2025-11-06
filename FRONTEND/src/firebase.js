import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl97K6vL7UABeRVOaje5rxcdGL7HvF17A",
  authDomain: "cognify-e5548.firebaseapp.com",
  projectId: "cognify-e5548",
  storageBucket: "cognify-e5548.firebasestorage.app",
  messagingSenderId: "851554640791",
  appId: "1:851554640791:web:872c96baed4b2b92a41ad2",
  measurementId: "G-03BH6MKYW1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
