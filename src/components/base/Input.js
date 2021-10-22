import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import colors from '@constants/colors';

const Input = ({ block = false, width, height, fontSize, placeholder, onChange, ...props }) => {
  const InputStyle = {
    display: block ? 'block' : 'inline-block',
    width,
    height,
    fontSize
  };
  const handleChange = useCallback(e => {
    onChange && onChange(e.target.value);
  }, [onChange]);
  
  return (
    <input {...props} 
      placeholder={placeholder} 
      style={{ 
        ...props.style,
        ...InputStyle,
        outlineColor: colors.ACCENT
      }} 
      onChange={handleChange} />
  );
};

export default Input;

Input.propTypes = {
  initialValue: PropTypes.string,
  block: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
