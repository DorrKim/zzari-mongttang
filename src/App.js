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
import NotFoundPage from '@pages/Error/NotFound';


function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/editProfile" >
            <EditProfilePage />
          </Route>
          <Route exact path="/search">
            <Header />
            <SearchPage />
          </Route>
          <Route exact path="/user/:userId">
            <Header />
            <PersonalPage />
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
        @font-face {
            font-family: 'netmarbleM';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.1/netmarbleM.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: 'KoPubDotumMedium';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/KoPubDotumMedium.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: 'GmarketSansMedium';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
            font-weight: normal;
            font-style: normal;
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
