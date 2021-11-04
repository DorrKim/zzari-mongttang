import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Flex from '@base/Flex';
import Logo from '@components/Logo';
import LoginForm from '@domains/LoginForm';
import { useAuthorization } from '@context/AuthorizationProvider';
import useAxios from '@hooks/useAxios';
import styled from '@emotion/styled';
import { STYLE_CONSTANTS } from '@constants/margins';


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
  
  return (
    <FlexStyled column alignItems='center'>
      <Logo name='login' link style={{ marginBottom: STYLE_CONSTANTS.margin.NO_HEADER_LOGO_MARGIN_BOTTOM }} />
      <LoginForm 
        style={{ 
          marginTop: 20 }}
        loginError={loginAPIState.error ? true : false}
        onLogin={handleLogIn}
        onToSubmitPage={handleToSubmitPage}
      />
    </FlexStyled>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADER_MAIN_MARGIN_TOP}px;
`;

export default LoginPage;
