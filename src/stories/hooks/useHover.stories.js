import React from 'react';
import styled from '@emotion/styled';
import useHover from '@hooks/useHover';


export default {
  title: 'Hook/useHover'
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: orange;
`;

export const Default = () => {
  const [ref, isHover] = useHover();
  
  return (
    <>
      <Box ref={ref}></Box>
      {isHover ? 'true' : 'false'}
    </>
  ); 
};
