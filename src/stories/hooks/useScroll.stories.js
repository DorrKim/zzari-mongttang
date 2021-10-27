import React from 'react';
import styled from '@emotion/styled';
import useScroll from '@hooks/useScroll';


export default {
  title: 'Hook/useScroll'
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: orange;
  overflow: auto; 
`;

const Inner = styled.div`
  width: 1000px;
  height: 1000px;
  background-image: linear-gradient(180deg, #000 0%, #fff 100%); 
`;

export const Default = () => {
  const [ref, coord] = useScroll();
  
  return (
    <>
      <Box ref={ref}>
        <Inner></Inner>
      </Box>
      <button
        onClick={() => {
          ref.current.scrollTo({ 
            top: 800,
            left: 800,
            behavior: 'smooth' });
        }}>
        Scroll
      </button>
      {coord.x} {coord.y}
    </>
  );
};
