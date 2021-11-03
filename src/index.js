// import AuthorizationProvider from '@context/AuthorizationProvider';
import AuthorizationProvider from '@context/AuthorizationProvider';
import ViewPortProvider from '@context/ViewPortProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <AuthorizationProvider>
    <ViewPortProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ViewPortProvider>
  </AuthorizationProvider>
  , document.getElementById('root')
);
