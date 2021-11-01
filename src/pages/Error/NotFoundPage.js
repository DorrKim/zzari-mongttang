import React from 'react';
import styled from '@emotion/styled';


const NotFoundPage = () => {
  return (
    <Wrapper>
      <img alt='404 에러' src='https://user-images.githubusercontent.com/70619304/139665845-27466d93-fa46-4c1f-8204-dda7eff196a8.gif'/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default NotFoundPage;
