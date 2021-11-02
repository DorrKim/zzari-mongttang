import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import Button from '@base/Button';
import Text from '@base/Text';


const ApiError = () => {
  const history = useHistory();

  const handleToMainPage = useCallback(() => {
    history.push('/');
  }, []);

  return (
    <Wrapper>
      <StyledButton onClick={handleToMainPage}>
        <Text style={{ fontSize: '30px' }}>되돌아가기</Text>
      </StyledButton>
      <StyledImage style={{ }} alt='api 에러' src='https://user-images.githubusercontent.com/70619304/139689575-8dc558a8-5e01-4215-89f3-fe109f65c41e.gif'/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledImage = styled.img`
  @keyframes ball {
    0% {
      top:300px;
    }
    to {
      top:100px;
    } 
  }
  position: absolute;
  top: 200px;
  z-index: -1;
`;

const StyledButton = styled(Button)`
  width: 300px;
  height: 300px;
  border: none;
  border-radius: 5px;
  position: absolute;
  top: 400px;
  z-index: 1;
  &:hover + img {
    animation: ball 1s ease-in Infinite Alternate;
  }
`;

export default ApiError;
