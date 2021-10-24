import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import colors from '@constants/colors';

const InputStyled = styled.input`
  ${({ inputStyle }) => inputStyle};
`;

const Input = ({ block = false, width, height, fontSize, placeholder, onChange, ...props }) => {
  const InputStyle = {
    display: block ? 'block' : 'inline-block',
    width,
    height,
    fontSize,
    outLineColor: colors.ACCENT
  };
  const handleChange = useCallback(e => {
    onChange && onChange(e.target.value);
  }, [onChange]);
  
  return (
    <InputStyled {...props} 
      placeholder={placeholder}
      inputStyle={InputStyle}
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
  onChange: PropTypes.func
};
