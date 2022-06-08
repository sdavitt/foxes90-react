import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // importing the router component so that we can wrap our App component in it, giving our app access to routing features
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyCanqikPGnKfG1Rl-0GmTMyetZVp08XUpM",
  authDomain: "foxes90-pets.firebaseapp.com",
  projectId: "foxes90-pets",
  storageBucket: "foxes90-pets.appspot.com",
  messagingSenderId: "344924194382",
  appId: "1:344924194382:web:1a554859b5bc7e878d651f"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // This is JSX - a templating language that is a blend of JavaScript and HTML
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <ProviderLayer />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
