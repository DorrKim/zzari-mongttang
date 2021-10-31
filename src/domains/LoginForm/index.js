import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import { validateLogin } from '@library/validate';
import useForm from '@hooks/useForm';
import colors from '@constants/colors';

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
      <Button 
        type='submit'
        disabled={isLoading}
        style={{ 
          border: 'none',
          display: 'block',
          marginTop: 60,
          marginBottom: 16 }}
        backgroundColor={'#FD9F28'} 
        borderRadius={'4px'} 
        width='100%'
        height={60}
        hover={{ filter: 'brightness(90%)' }}
        focus={null}
        active={{ filter: 'brightness(80%)' }}
      > 
          로그인 
      </Button>
      <Button 
        style={{ 
          border: 'none',
          display: 'block' 
        }}
        backgroundColor={'#ffffff'}
        borderRadius={'4px'}
        width='100%'
        height={60}
        hover={{ filter: 'brightness(90%)' }}
        focus={null}
        active={{ filter: 'brightness(80%)' }}
        onClick={handleToSubmitPage} 
      >
            회원가입
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const FormInputStyled = styled(FormInput)`
border-radius: 5px;
height: 60px;
border: 1px solid ${colors.BORDER_SUBTLE};
margin-bottom: 5px;

&:nth-of-type(2) {
  margin-top: 20px;
}
`;

LoginForm.propTypes = {
  loginError: PropTypes.bool,
  onLogin: PropTypes.func,
  onToSubmitPage: PropTypes.func
};

export default LoginForm;
