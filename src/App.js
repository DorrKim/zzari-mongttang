import React from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from '@domains/Header';
import DetailPage from '@pages/DetailPage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import PersonalPage from '@pages/PersonalPage';
import SearchPage from '@pages/SearchPage';
import SignUpPage from '@pages/SignUpPage';
import UploadPage from '@pages/UploadPage';
import EditProfilePage from '@pages/EditProfilePage';
import EditPostPage from '@pages/EditPostPage';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/editProfile" >
            <EditProfilePage />
          </Route>
          <Route path="/search">
            <Header />
            <SearchPage />
          </Route>
          <Route path="/user/:userId">
            <Header />
            <PersonalPage />
          </Route>
          <Route path="/zzal/:zzalId">
            <Header />
            <DetailPage />
          </Route>
          <Route path="/editZzal/:zzalId">
            <EditPostPage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/">
            <Header />
            <MainPage />
          </Route>
        </Switch>
      </Router>
      <Global styles={css`
        ${emotionReset}
        *, *::after, *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
        }
      `} />
    </>
  );
}

export default App;
