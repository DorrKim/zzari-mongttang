import React, { useCallback } from 'react';
import styled from '@emotion/styled';

import SignUpForm from '@domains/SignUpForm';
import Flex from '@base/Flex';
import { loginAPI } from '@api/loginAPI';
import { useHistory } from 'react-router';

const SignUpTitle = styled.h1`
  
`;

const SignUpPage = () => {
  const history = useHistory();

  const handleSignUp = useCallback(async ({ email, fullName, password }) => {
    const user = await loginAPI.postSignUp({ email,
      fullName,
      password });

    if (!user) {
      return { error: true };
    }
    alert('회원가입이 완료되었습니다. 해당 계정으로 로그인합니다.');
    history.push('/');
  }, []);

  const handleCancel = useCallback(() => {
    confirm('회원가입 페이지에서 나가시겠습니까? 해당 페이지 정보를 잃을 수 있습니다.') && history.push('/');
  });
  
  return (
    <>
      <Flex column alignItems='center'>
        <SignUpTitle>회원가입</SignUpTitle>
        <p>저희 페이지에서 회원가입을 하시면...</p>
        <SignUpForm 
          onSignUp={handleSignUp} 
          onCancel={handleCancel} />
      </Flex>
    </>);
};

export default SignUpPage;
