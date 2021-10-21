import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '@constants/colors';
import useToggle from '@hooks/useToggle';


const Label = styled.label`
  cursor: pointer;
  font-size: 12px;
  `;

const CheckboxSwitch = styled.div`
  background-color: ${colors.ACCENT};
  display: inline-block;
  padding: 3px 4px;
  border-radius: 20px;
  user-select: none;
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked + div {
    background-color: red;
  }
`;

const Checkbox = ({ name, on = false, onChange, ...props }) => {
  const [checked, toggle] = useToggle(on);

  const handleChange = e => {
    toggle();
    onChange && onChange(e);
  };

  return (
    <Label {...props}>
      <CheckboxInput type="checkbox" onChange={handleChange} checked={checked}/>
      <CheckboxSwitch >
        {name}
      </CheckboxSwitch>
    </Label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  on: PropTypes.bool,
  onChange: PropTypes.func
};

export default Checkbox;
