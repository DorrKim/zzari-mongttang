import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import colors from '@constants/colors';

const InputStyled = styled.input`
  ${({ inputStyle }) => inputStyle};
  &:focus {
    outline-color: ${colors.ACCENT};
  }
  padding: 0 10px;
`;

const Input = ({ 
  block = false,
  width = 200,
  height = 100,
  fontSize, 
  placeholder, 
  onChange, 
  style,
  ...props 
}) => {
  const InputStyle = {
    display: block ? 'block' : 'inline-block',
    width,
    height,
    fontSize,
    border: `1px solid ${colors.BORDER_SUBTLE}`,
    ...style
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
  onChange: PropTypes.func,
  style: PropTypes.object
};
