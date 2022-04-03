import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXXshjiQQSrNyY_tzNkj9dX0D8ZgTjZJQ",
  authDomain: "workspace-marketplace-41f5f.firebaseapp.com",
  projectId: "workspace-marketplace-41f5f",
  storageBucket: "workspace-marketplace-41f5f.appspot.com",
  messagingSenderId: "770506430583",
  appId: "1:770506430583:web:586cbacc0b2d2e4e708e72",
  measurementId: "G-3T4DL39V4Q",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
