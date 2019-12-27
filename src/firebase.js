import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDZ2a6cGuW5GxLjUfnN9-xtvjKII5eOt08",
  authDomain: "react-slack-app-177b0.firebaseapp.com",
  databaseURL: "https://react-slack-app-177b0.firebaseio.com",
  projectId: "react-slack-app-177b0",
  storageBucket: "react-slack-app-177b0.appspot.com",
  messagingSenderId: "34711103017",
  appId: "1:34711103017:web:58ab45b88a8c54baf9de38",
  measurementId: "G-H55QJW4G8R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;