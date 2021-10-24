import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Text from '@base/Text';
import colors from '@constants/colors';
import useToggle from '@hooks/useToggle';


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
  padding: 3px 4px;
  border-radius: 20px;
  user-select: none;
`;

const Checkbox = ({ 
  name,
  on = false, 
  unCheckedStyle = { backgroundColor: colors.ACCENT_BACKGROUND },
  checkedStyle = { backgroundColor: colors.ACCENT }, 
  onChange, 
  ...props }) => {
  const [checked, toggle] = useToggle(on);

  const handleChange = () => {
    toggle();
    onChange && onChange(checked);
  };

  return (
    <Label {...props}>
      <CheckboxInput type="checkbox" onChange={handleChange} checked={checked}/>
      <CheckboxSwitch checkStyle={checked ? checkedStyle : unCheckedStyle }>
        <Text size='sm'>{name}</Text>
      </CheckboxSwitch>
    </Label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  on: PropTypes.bool,
  unCheckedStyle: PropTypes.object,
  checkedStyle: PropTypes.object,
  onChange: PropTypes.func
};

export default Checkbox;
