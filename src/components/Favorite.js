import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Icon from '@components/base/Icon';
import Number from '@components/Number';

const FavoriteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-itme: center;
`;

const Favorite = ({ number, onClick, isToggled }) => {

  return (
    <>
      <FavoriteContainer>
        <Icon 
          name={'heart'} 
          onClick={onClick} 
          style={{ color: isToggled ? 'red' : 'black' }}
        >
        </Icon>
        <Number value={number}></Number>
      </FavoriteContainer>
    </>
  );
};

Favorite.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  isToggled: PropTypes.bool
};


export default Favorite;
