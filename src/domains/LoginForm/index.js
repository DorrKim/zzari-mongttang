import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import { validateLogin } from '@library/validate';
import useForm from '@hooks/useForm';

const LoginForm = ({ loginError, onLogin, onToSubmitPage, ...props }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: onLogin,
    validate: validateLogin
  });

  const handleToSubmitPage = useCallback(() => {
    onToSubmitPage && onToSubmitPage();
  }, [onToSubmitPage]);
  
  const { email, password } = values;
  
  return (
    <Form onSubmit={handleSubmit} {...props} >
      <FormInputStyled 
        onChange={value => handleChange({ 
          name: 'email',
          value })} 
        value={email} 
        placeholder='이메일' 
        errorMessage={error.email 
          ? '이메일 형식에 맞추어주세요.'
          : ''
        } 
      />
      <FormInputStyled
        type='password'
        onChange={value => handleChange({
          name: 'password',
          value
        })}
        value={password}
        placeholder='비밀번호'
        errorMessage={loginError
          ? '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요'
          : ''}
      />
      <ButtonStyled 
        type='submit'
        disabled={isLoading}
        backgroundColor={'#FD9F28'} 
        borderRadius={'4px'} 
      > 
          로그인 
      </ButtonStyled>
      <ButtonStyled 
        backgroundColor={'#ffffff'}
        borderRadius={'4px'}
        onClick={handleToSubmitPage} 
      >
            회원가입
      </ButtonStyled>
    </Form>
  );
};

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const FormInputStyled = styled(FormInput)`

margin-bottom: 5px;

&:nth-of-type(2) {
  margin-top: 20px;
}
`;

const ButtonStyled = styled(Button)`
border: none;
display: block;
width: 100%;
height: 60px;

&:nth-of-type(1) {
  margin-top: 20px;
  margin-bottom: 20px;
}
`;

LoginForm.propTypes = {
  loginError: PropTypes.bool,
  onLogin: PropTypes.func,
  onToSubmitPage: PropTypes.func
};

export default LoginForm;
