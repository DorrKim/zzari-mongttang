import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Text from '@base/Text';
import colors from '@constants/colors';


const Label = styled.label`
  cursor: pointer;
  font-size: 12px;
  `;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxSwitch = styled.div`
  ${({ checkStyle }) => checkStyle};
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  user-select: none;
  line-height: 100%;
`;

const Checkbox = ({ 
  name,
  checked = false, 
  unCheckedStyle = { backgroundColor: colors.ACCENT_BACKGROUND },
  checkedStyle = { backgroundColor: colors.ACCENT }, 
  onChange, 
  ...props 
}) => {
  
  const handleChange = useCallback(e => {
    onChange && onChange(e);
  }, []);

  return (
    <Label {...props}>
      <CheckboxInput type="checkbox" onChange={handleChange} checked={checked}/>
      <CheckboxSwitch checkStyle={checked ? checkedStyle : unCheckedStyle }>
        <Text style={{ whiteSpace: 'nowrap' }} size='md'>{name}</Text>
      </CheckboxSwitch>
    </Label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  unCheckedStyle: PropTypes.object,
  checkedStyle: PropTypes.object,
  onChange: PropTypes.func
};

export default Checkbox;
