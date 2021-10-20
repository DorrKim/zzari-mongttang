import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const TEXT_SIZES = {
  sm: css`
    font-size: 12px;
    padding: 1px 2px;
  `,
  md: css`
    font-size: 16px;
    padding: 2px 4px;
  `,
  lg: css`
    font-size: 24px;
    padding: 4px 6px;
  `
};

const Text = ({ text, size, color }) => {
  // eslint-disable-next-line prefer-destructuring
  const fontSize = TEXT_SIZES[size];

  return (
    <StyledText fontSize={fontSize} style={{ color }}>
      { text }
    </StyledText> 
  );                
};

const StyledText = styled.text`
  ${props => props.fontSize};
`;

Text.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
};

export default Text;
