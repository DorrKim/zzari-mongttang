import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import SignUpForm from '@domains/SignUpForm';
import Flex from '@base/Flex';
import { useHistory } from 'react-router';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import { STYLE_CONSTANTS } from '@constants/margins';
import Logo from '@components/Logo';
import Title from '@components/Title';

const SignUpPage = () => {
  const [isSignUped, setIsSignUped] = useState(false);
  const { updateAuthState } = useAuthorization();
  const history = useHistory();

  const [signUpAPIState, postSignUp] = useAxios('/signup', {
    method: 'post'
  });
  
  const handleSignUp = useCallback(async ({ email, fullName, password }) => await postSignUp({ 
    data: {
      email,
      fullName,
      password
    }})
  , []);

  const handleCancel = useCallback(() => {
    confirm('회원가입 페이지에서 나가시겠습니까? 해당 페이지 정보를 잃을 수 있습니다.') && history.push('/');
  });

  useEffect(() => {
    if (signUpAPIState.value) {
      const {
        value: {
          token,
          user: { _id, fullName, image }
        }
      } = signUpAPIState;
      updateAuthState({ 
        authToken: token,
        myUser: {
          _id,
          fullName,
          image
        }});
      alert('회원가입이 완료되었습니다! 해당 계정으로 로그인합니다.');

      setIsSignUped(true);
    } 
  }, [signUpAPIState]);

  useEffect(() => {
    isSignUped && history.push('/');
  }, [isSignUped]);
  
  return (
    <>
      <FlexStyled column alignItems='center'>
        <Logo link />
        <Title>회원가입</Title>
        <SignUpForm
          signupError={signUpAPIState.error}
          onSignUp={handleSignUp} 
          onCancel={handleCancel} />
      </FlexStyled>
    </>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADER_MAIN_MARGIN_TOP}px;
`;


export default SignUpPage;
