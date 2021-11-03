import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Text from '@base/Text';
import colors from '@constants/colors';


const Label = styled.label`
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxSwitch = styled.div`
  ${({ checked }) => checked 
    ? ({
      backgroundColor: colors.ACCENT
    }) 
    : ({
      backgroundColor: colors.ACCENT_BACKGROUND
    })}
  transition: background-color 0.2s ease-in-out;
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  user-select: none;
`;

const Checkbox = ({ 
  name,
  size = 'md',
  checked = false, 
  onChange, 
  ...props 
}) => {
  
  const handleChange = useCallback(e => {
    onChange && onChange(e);
  }, []);

  return (
    <Label {...props}>
      <CheckboxInput type="checkbox" onChange={handleChange} checked={checked}/>
      <CheckboxSwitch checked={checked}>
        <Text style={{ whiteSpace: 'nowrap' }} size={size}>{name}</Text>
      </CheckboxSwitch>
    </Label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

export default Checkbox;
