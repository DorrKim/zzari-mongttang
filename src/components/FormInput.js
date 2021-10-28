import React from 'react';
import Input from '@base/Input';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Alert = styled.div`
  font-size: 12px;
  color: red;
  height: 16px;
  padding: 0 5px;
`;

const FormInput = ({ type = 'text', onChange, value, placeholder, errorMessage, ...props }) => {

  return (
    <>
      <Input
        type={type}
        onChange={onChange}
        value={value} 
        block
        width={350}
        height={48} 
        placeholder={placeholder}
        fontSize={18}
        style={{ 
          ...props.style,
          marginBottom: 3 }}
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
  errorMessage: PropTypes.string,
  style: PropTypes.object
};

export default FormInput;
