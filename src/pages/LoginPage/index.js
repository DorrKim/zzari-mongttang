import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import LoginForm from '@/domains/LoginForm';
import { loginAPI } from '@/utils/api/loginAPI';
import { useHistory } from 'react-router';

// 임시 컴포넌트
const Logo = styled.div`
  margin-top: 70px;
  font-size: 32px;
  text-align: center;
`;

const LoginPage = () => {
  const history = useHistory();

  const handleLogIn = useCallback(async ({ email, password }) => {
    const user = await loginAPI.postLogin({ email,
      password });

    if (user) {
      history.push('/');
      
      return; 
    }

    return { error: true };
  }, []);

  const handleToSubmitPage = useCallback(() => {
    history.push('/signup');
  }, []);
  
  return <>
    <Logo> 로고 </Logo>
    <LoginForm 
      style={{ 
        marginTop: 100 }}
      onLogin={handleLogIn}
      onToSubmitPage={handleToSubmitPage}
    />
  </>;
};

export default LoginPage;
