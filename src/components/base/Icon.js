import React from 'react';
import PropTypes from 'prop-types';
import { ICON_TYPES } from '@constants/icons';

const Icon = ({ 
  name, 
  fontSize, 
  color,
  ...props 
}) => {
  const { [name]: IconTag } = ICON_TYPES;

  const iconStyle = {
    color,
    fontSize,
    ...props.style
  };

  return <IconTag style={{ ...iconStyle }} {...props} />; 
};

Icon.propTypes = {
  name: PropTypes.string,
  fontSize: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  color: PropTypes.string,
  style: PropTypes.object
};
                               
export default Icon;
