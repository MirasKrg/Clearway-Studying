
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase.config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Не удалось найти корневой элемент для монтирования");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
