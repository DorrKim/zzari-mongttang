import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import LoginForm from '@domains/LoginForm';
import { useHistory } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';

// 임시 컴포넌트
const Logo = styled.div`
  margin-top: 70px;
  font-size: 32px;
  text-align: center;
`;

const LoginPage = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [loginAPIState, postLogin] = useAxios('/login', {
    method: 'post'
  });
  const { 
    updateAuthState 
  } = useAuthorization();
  const history = useHistory();

  const handleLogIn = useCallback(async ({ email, password }) => {
    await postLogin({ 
      data: { 
        email,
        password
      }
    });
  }, []);

  const handleToSubmitPage = useCallback(() => {
    history.push('/signup');
  }, []);

  useEffect(() => {
    if (loginAPIState.value) {
      const { 
        value: { 
          token, 
          user: { _id, fullName, image }
        }
      } = loginAPIState;
      updateAuthState({ authToken: token,
        myUser: {
          _id,
          fullName,
          image
        }});

      setIsLogined(true);
    }
  }, [loginAPIState]);  

  useEffect(() => {
    isLogined && history.push('/');
  }, [isLogined]);
  
  return <>
    <Logo> 로고 </Logo>
    <LoginForm 
      style={{ 
        marginTop: 100 }}
      loginError={loginAPIState.error ? true : false}
      onLogin={handleLogIn}
      onToSubmitPage={handleToSubmitPage}
    />
  </>;
};

export default LoginPage;
