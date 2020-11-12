import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from "./serviceWorker";

function register(config) {
  if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope:',  registration.scope);
  }).catch(function(error) {
    console.log('ServiceWorker registration failed:', error);
  });}}
ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
register();
