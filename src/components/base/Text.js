import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const TEXT_SIZES = {
  sm: css`
    font-size: 12px;
  `,
  md: css`
    font-size: 16px;
  `,
  lg: css`
    font-size: 24px;
  `
};

const Text = ({ 
  children, 
  block,
  size = 'md', 
  color = 'black', 
  bold,
  style,
  ...props
}) => {
  const tag = block ? 'div' : 'span';
  const { [size]: fontSize } = TEXT_SIZES;
  const fontWeight = bold ? 'bold' : 'normal';

  return (
    <StyledText as={tag} fontSize={fontSize} style={{
      color,
      fontWeight,
      ...style
    }} {...props}>
      { children }
    </StyledText>
  );                
};

const StyledText = styled.div`
    ${props => props.fontSize};
`;

Text.propTypes = {
  children: PropTypes.string.isRequired,
  block: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  style: PropTypes.object
};

export default Text;
