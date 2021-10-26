import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '@/utils/constants/colors';

const Line = styled.hr`
  border: none;
  background-color: #aaa;

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
  }
`;

const Divider = ({ type = 'horizontal', // horizontal, vertical
  size = 8, color = colors.BORDER_NORMAL,
  ...props }) => {
  const dividerStyle = {
    margin: type === 'vertical' 
      ? `0 ${size}px` 
      : `${size}px 0`,
    backgroundColor: color
  };
  
  return <Line className={type} {...props} style={{ ...dividerStyle,
    ...props.style }} />;
};

Divider.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object
};

export default Divider;
