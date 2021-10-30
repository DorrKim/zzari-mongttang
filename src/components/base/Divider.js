import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '@constants/colors';

const Line = styled.hr`
  border: none;
  background-color: ${({ color }) => color};

  &.vertical {
    position: relative;
    top: -1;
    display: inline-block;
    width: 1px;
    height: 13px;
    vertical-align: middle;
    margin: ${({ size }) => `0 ${size}px`}
  }

  &.horizontal {
    display: block;
    width: 100%;
    height: 1px;
    margin: ${({ size }) => `${size}px 0`}
  }
`;

const Divider = ({ type = 'horizontal', // horizontal, vertical
  size = 8, color = colors.BORDER_NORMAL,
  ...props }) => {

  return <Line className={type} size={size} color={color} {...props} />;
};

Divider.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object
};

export default Divider;
