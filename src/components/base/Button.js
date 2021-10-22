import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const StyledButton = styled.button(({ 
  backgroundColor, width, height,
  borderColor, borderRadius, borderWidth }) => ({
  backgroundColor,
  width,
  height,
  borderColor,
  borderRadius,
  borderWidth
}));

const Button = ({
  backgroundColor = 'red', width = '100px', height = '100px',
  borderColor = 'blue', borderRadius = '10px', borderWidth = 'thin', 
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
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  borderWidth: PropTypes.string,
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
