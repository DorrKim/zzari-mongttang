import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';


const Input = ({ width, height, fontSize, placeholder, onChange, ...props }) => {
  const [value, setValue] = useState('');

  const InputStyle = {
    width,
    height,
    fontSize
  };

  const handleChange = useCallback(e => {
    setValue(e.target.value);
    
    onChange && onChange(e.target.value);
  }, [onChange]);
  
  return (
    <input {...props} 
      placeholder={placeholder} 
      style={{ 
        ...props.style,
        ...InputStyle 
      }} 
      value={value} 
      onChange={handleChange} />
  );
};

export default Input;

Input.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func
};
