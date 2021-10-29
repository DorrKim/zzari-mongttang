import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Icon from '@components/base/Icon';
import useToggle from '@hooks/useToggle';
import Number from '@components/Number';

const FavoriteContainer = styled.div`
  display: 'flex'
`;

const Favorite = ({ number }) => {
  const [isToggled, handleToggle] = useToggle();
  
  const handleClick = useCallback(() => {
    handleToggle();
  }, [isToggled, handleToggle]);

  return (
    <>
      <FavoriteContainer>
        <Icon 
          name={'heart'} 
          onClick={handleClick} 
          style={{ color: isToggled ? 'red' : 'black' }}
        >
        </Icon>
        <Number favoriteCount={number}></Number>
      </FavoriteContainer>
    </>
  );
};

Favorite.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};


export default Favorite;
