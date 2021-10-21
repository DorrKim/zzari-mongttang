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
  children, backgroundColor, 
  width, height, onClick,
  borderColor, borderRadius, borderWidth }) => {
  

  //Todo: 상위컴포넌트가 결정되면 props들을 비슷한 속성은 하나의 키값으로 묶어서 보낼 수 있을것 같습니다.
  return (
    <StyledButton 
      type='button'
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      onClick={onClick}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
    >
      <div>{children}</div>
    </StyledButton>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  borderColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  borderWidth: PropTypes.string.isRequired
};

export default Button;
