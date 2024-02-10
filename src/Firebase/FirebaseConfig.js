import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "process.env.React_App_Firebase_Apikey",
  authDomain: "process.env.React_App_Firebase_AuthDomain",
  projectId: "process.env.React_App_Firebase_ProjectID",
  storageBucket: "process.env.React_App_Firebase_StorageBucket",
  messagingSenderId: "process.env.React_App_Firebase_MessagingSenderID",
  appId: "process.env.React_App_Firebase_AppID",
  measurementId: "process.env.React_App_Firebase_MeasurementID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
