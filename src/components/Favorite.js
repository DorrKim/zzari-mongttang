import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Icon from '@components/base/Icon';
import Number from '@components/Number';
import colors from '@constants/colors';

const FavoriteContainer = styled.div`
  display: flex;
  width: 40px;
  justify-content: flex-end;
  opacity: 1;
  &:hover :nth-child(1){
    color: ${colors.ACCENT};
}
`;

const Favorite = ({ number, onClick, isToggled, ...props }) => {
  const toggledStyle = {
    color: colors.ACCENT,
    opacity: 1,
    flexShrink: 0,
    marginRight: 6,
    cursor: 'pointer'
  };

  const unToggledStyle = {
    color: colors.TEXT_NORMAL,
    opacity: 0.5,
    flexShrink: 0,
    marginRight: 6,
    cursor: 'pointer'
  };

  return (
    <>
      <FavoriteContainer {...props}>
        <Icon 
          name={isToggled ? 'filledHeart' : 'heart'} 
          onClick={onClick} 
          style={isToggled ? { ...toggledStyle } : { ...unToggledStyle }}
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
