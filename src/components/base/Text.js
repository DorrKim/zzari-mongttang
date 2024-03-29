import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const TEXT_SIZES = {
  sm: css`
    font-size: 12px;
    height: 12px;
    line-height: 14px;
    `,
  md: css`
    font-size: 16px;
    height: 16px;
    line-height: 18px;
    `,
  lg: css`
    font-size: 24px;
    height: 24px;
    line-height: 26px;
  `
};

const Text = ({ 
  children, 
  block,
  size = 'md', 
  color, 
  bold,
  style,
  selectable = false,
  ...props
}) => {
  const tag = block ? 'div' : 'span';
  const { [size]: fontSize } = TEXT_SIZES;
  const fontWeight = bold ? 'bold' : 'normal';
  const userSelect = selectable ? 'auto' : 'none';
  
  return (
    <StyledText as={tag} fontSize={fontSize} style={{
      color,
      fontWeight,
      userSelect,
      ...style
    }} {...props}>
      { children }
    </StyledText>
  );                
};

const StyledText = styled.div`
    ${props => props.fontSize};
    font-family: 'NEXON Lv1 Gothic OTF';
`;

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node
  ]),
  block: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  bold: PropTypes.bool,
  style: PropTypes.object,
  selectable: PropTypes.bool
};

export default Text;
