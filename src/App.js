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
import NotFoundPage from '@pages/Error/NotFoundPage';
import ApiErrorPage from '@pages/Error/ApiErrorPage';
import Footer from '@domains/Footer';


function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
            <Footer />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
            <Footer />
          </Route>
          <Route exact path="/editProfile" >
            <EditProfilePage />
          </Route>
          <Route exact path="/search">
            <Header />
            <SearchPage />
            <Footer />
          </Route>
          <Route exact path="/user/:userId">
            <Header />
            <PersonalPage />
            <Footer />
          </Route>
          <Route exact path="/zzal/:zzalId">
            <Header />
            <DetailPage />
          </Route>
          <Route exact path="/editZzal/:zzalId">
            <EditPostPage />
          </Route>
          <Route exact path="/upload">
            <UploadPage />
          </Route>
          <Route exact path="/">
            <Header />
            <MainPage />
            <Footer />
          </Route>
          <Route exact path="/error">
            <ApiErrorPage />
          </Route>
          <Route>
            <NotFoundPage />
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
        #root {
          position: relative;
          min-height: calc(100vh - 70px);
          padding-bottom: 70px;
          ::-webkit-scrollbar {
            position: absolute;
          }
        }
        @font-face {
            font-family: 'NEXON Lv1 Gothic OTF';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }
      `} />
    </>
  );
}

export default App;
