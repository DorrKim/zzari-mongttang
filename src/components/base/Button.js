import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const StyledButton = styled.button(({ 
  backgroundColor, width, height,
  borderColor, borderRadius, borderWidth,
  hover, focus, active,
  ...props }) => ({
  backgroundColor,
  width,
  height,
  borderColor,
  borderRadius,
  borderWidth,
  '&:hover': hover,
  '&:focus': focus,
  '&:active': active,
  ...props
}));


const Button = ({
  backgroundColor = 'red', width = '100px', height = '100px',
  borderColor = 'blue', borderRadius = '10px', borderWidth = 'thin',
  hover = { backgroundColor: 'blue' }, 
  focus = { background: 'yellow',
    color: 'blue' }, 
  active = {
    color: 'blue',
    backgroundColor: 'yellow',
    textDecoration: 'none'
  },
  children, onClick, ...props }) => {

  /**
 * Todo: 상위컴포넌트가 결정되면 
 * props들을 비슷한 속성은 객체로 묶어서 보낼 수 있을것 같습니다.
 */

  return (
    <StyledButton 
      type='button'
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      hover={hover}
      focus={focus}
      active={active}
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
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  borderWidth: PropTypes.string,
  hover: PropTypes.object,
  focus: PropTypes.object,
  active: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
