import React from 'react';
import Input from '@base/Input';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import colors from '@constants/colors';

const Alert = styled.div`
  font-size: .8rem;
  color: ${colors.ALERT};
  height: 16px;
  padding: 0 5px;
`;

const InputStyled = styled(Input)`
width: 350px;
height: 48px;
font-size: 18;
border-radius: 5px;
border: 1px solid ${colors.BORDER_SUBTLE};
`;

const FormInput = ({ type = 'text', onChange, value, placeholder, errorMessage, ...props }) => {

  return (
    <>
      <InputStyled
        type={type}
        block
        value={value} 
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      <Alert>
        {errorMessage}
      </Alert>
    </>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string
};

export default FormInput;
