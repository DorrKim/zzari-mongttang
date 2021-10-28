import React from 'react';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Header from '@domains/Header';
import DetailPage from '@pages/DetailPage';
import LoginPage from '@pages/LoginPage';
import MainPage from '@pages/MainPage';
import PersonalPage from '@pages/PersonalPage';
import SearchPage from '@pages/SearchPage';
import SignUpPage from '@pages/SignUpPage';
import UploadPage from '@pages/UploadPage';
import useToggle from './hooks/useToggle';


function App() {
  const [isAuthorized, toggle] = useToggle(false);

  return (
    <>
      <Router>
        <Header isAuthorized={isAuthorized} />
        <input type='checkbox' checked={isAuthorized} onChange={() => toggle()} />
        {isAuthorized ? '로그인 됨' : '로그인 안됨'}
        <nav>
          <ul>
            <li>
              <Link to="/">메인페이지</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/search/hongjung">검색결과</Link>
            </li>
            <li>
              {/* <Link to="/user/1">유저1</Link>  */}
              <Link to="/user/617254d827ef072f7d78081a">유저1</Link>
            </li>
            <li>
              <Link to="/zzal/1">짤1</Link>
            </li>
            <li>
              <Link to="/upload">업로드</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/search/:keyword">
            <SearchPage />
          </Route>
          <Route path="/user/:userId">
            <PersonalPage />
          </Route>
          <Route path="/zzal/:zzalId">
            <DetailPage />
          </Route>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/">
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
