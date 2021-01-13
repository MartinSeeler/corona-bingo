import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
// import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import "firebase/auth";
import "firebase/functions";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCnCE4k6CUEFdyAwSlxBhVc6AWYXtFIF4",
  authDomain: "corona-bingo.firebaseapp.com",
  databaseURL:
    "https://corona-bingo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "corona-bingo",
  storageBucket: "corona-bingo.appspot.com",
  messagingSenderId: "451197051912",
  appId: "1:451197051912:web:5581d1c2aa49a97365ddbd",
  measurementId: "G-PB90NKSS3W",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
