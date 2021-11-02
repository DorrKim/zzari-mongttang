import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import Flex from '@base/Flex';
import useForm from '@hooks/useForm';
import { validateSignUp } from '@library/validate';
import styled from '@emotion/styled';

const SIGN_UP_ERRORS = {
  emailInUse: 'The email address is already being used.'
};

const SIGN_UP_ERROR_MESSAGES = {
  email: '이메일 형식에 맞추어주세요.',
  emailInUse: '이미 사용중인 이메일입니다',
  fullName: '2자이상 10자이하의 이름을 입력해주세요.',
  password: '6자이상 18자이하의 비밀번호를 입력해주세요.',
  verifyPassword: '비밀번호가 일치하지 않습니다.'
};

const SignUpForm = ({ signupError, onSignUp, onCancel }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      verifyPassword: ''
    },
    onSubmit: onSignUp,
    validate: validateSignUp
  });
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    const newErrorMessage = Object
      .keys(error)
      .reduce((acc, name) => {
        const { [name]: errorMessage } = SIGN_UP_ERROR_MESSAGES;
        acc[name] = errorMessage;
      
        return acc;
      }, {});
    if (!newErrorMessage.email
       && signupError?.response.data === SIGN_UP_ERRORS.emailInUse) {
      const { emailInUse } = SIGN_UP_ERROR_MESSAGES;
      newErrorMessage.email = emailInUse;
    }
    setErrorMessage(newErrorMessage);
  }, [error]);

  const handleCancelClick = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);
  
  const { email, fullName, password, verifyPassword } = values;
    
  return (
    <Form onSubmit={handleSubmit}>
      <FormInput 
        onChange={value => handleChange({ name: 'email',
          value })} 
        value={email} 
        placeholder='이메일' 
        errorMessage={errorMessage.email
        } 
      />
      <FormInput
        onChange={value => handleChange({ name: 'fullName',
          value })}
        value={fullName}
        placeholder='닉네임 (2자~10자 이내)'
        errorMessage={errorMessage.fullName
        }
      />
      <FormInput
        type='password'
        onChange={value => handleChange({ name: 'password',
          value })}
        value={password}
        placeholder='비밀번호 (6자~18자 이내)'
        errorMessage={errorMessage.password
        }
      />
      <FormInput
        type='password'
        onChange={value => handleChange({ name: 'verifyPassword',
          value })}
        value={verifyPassword}
        placeholder='비밀번호 확인'
        errorMessage={errorMessage.verifyPassword
        }
      />
      <Flex justifyContent='space-between'>
        <ButtonStyled 
          type='submit' 
          disabled={isLoading} 
          backgroundColor={'#FD9F28'} 
        >생성</ButtonStyled>
        <ButtonStyled 
          backgroundColor={'#dddd'} 
          onClick={handleCancelClick} 
        >취소</ButtonStyled>
      </Flex>
    </Form>
  );
};

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 5px;
`;

const ButtonStyled = styled(Button)`
border-radius: 4px;
border: none;
width: 164px;
height: 60px;
`;

SignUpForm.propTypes = {
  signupError: PropTypes.object,
  onSignUp: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default SignUpForm;
