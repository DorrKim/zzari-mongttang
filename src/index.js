// import AuthorizationProvider from '@context/AuthorizationProvider';
import AuthorizationProvider from '@context/AuthorizationProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <AuthorizationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthorizationProvider>
  , document.getElementById('root')
);
