import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import colors from '@constants/colors';
import styled from '@emotion/styled';

const Spinner = () => {
  return (
    <Wrapper>
      <Loader
        type='Plane'
        color={colors.ACCENT}
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`;

export default Spinner;

