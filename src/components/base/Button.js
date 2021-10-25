import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import colors from '@constants/colors';

const { ACCENT } = colors;

const StyledButton = styled.button(({ 
  backgroundColor, width, height,
  borderColor, borderRadius, borderWidth,
  hover, active, cursor,
  ...style }) => ({
  backgroundColor,
  width,
  height,
  borderColor,
  borderRadius,
  borderWidth,
  '&:hover': hover,
  '&:active': active,
  cursor,
  ...style
}));

const Button = ({
  backgroundColor = ACCENT, width = '100px', height = '100px',
  border = 'none', borderWidth = 'thin',
  hover = { filter: 'brightness(90%)' },
  active = { filter: 'brightness(80%)' }, cursor = 'pointer',
  children, onClick, ...props }) => {

  return (
    <StyledButton 
      type='button'
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      border={border}
      borderWidth={borderWidth}
      hover={hover}
      active={active}
      cursor={cursor}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.string,
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hover: PropTypes.object,
  active: PropTypes.object,
  cursor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
