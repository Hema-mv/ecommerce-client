import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Utilities/UserContext';
import App from './App';
import './Styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserProvider>
);
