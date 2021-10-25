import React, { useCallback, useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import { validateEmail, validateFullName, validatePassword, validateVerifyPassword } from '@library/validate';
import FormInput from '@components/FormInput';
import Flex from '@/components/base/Flex';

const SignUpForm = ({ onSignUp, onCancel }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [validateForm, setValidateForm] = useState({
    isEmail: false,
    isEmailInUse: false,
    isFullName: false,
    isPassword: false,
    isVerifyPassword: false
  });
  const [isSignUpable, setIsSignUpable] = useState(false);

  useEffect(() => {
    if (
      validateForm.isEmail 
      && validateForm.isFullName 
      && validateForm.isPassword 
      && validateForm.isVerifyPassword
    ) {
      setIsSignUpable(true);
    } else {
      setIsSignUpable(false);
    }
  }, [validateForm]);

  useEffect(() => {
    setValidateForm(validateForm => ({
      ...validateForm,
      isPassword: validatePassword(password),
      isVerifyPassword: validateVerifyPassword(password, verifyPassword)
    }));
  }, [password, verifyPassword]);


  const handleEmailChange = useCallback(value => {
    setEmail(value);
    setValidateForm(validateForm => ({ ...validateForm,
      isEmail: validateEmail(value),
      isEmailInUse: false }));
  }, []);

  const handleFullNameChange = useCallback(value => {
    setFullName(value);
    setValidateForm(validateForm => ({ ...validateForm,
      isFullName: validateFullName(value) }));
  }, []);

  const handlePasswordChange = useCallback(value => {
    setPassword(value);
    setValidateForm(validateForm => ({ ...validateForm,
      isPassword: validatePassword(value) }));
  }, []);

  const handleVerifyPasswordChange = useCallback(value => {
    setVerifyPassword(value);
  }, []);

  const handleSignUpClick = useCallback(async e => {
    e.preventDefault();
    if (!isSignUpable){
      return;
    }
    setIsSignUpable(false);
    const res = onSignUp && await onSignUp({
      email,
      fullName,
      password
    });
    
    if (res?.error) {
      setValidateForm({ ...validateForm,
        isEmailInUse: true });
      setIsSignUpable(false);
    } else {
      setIsSignUpable(true);
    }
    
  });

  const handleCancelClick = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const { isEmail, isEmailInUse, isFullName, isPassword, isVerifyPassword } = validateForm;
  
  return (
    <Flex justifyContent='center'>
      <form onSubmit={handleSignUpClick} >
        <FormInput 
          onChange={handleEmailChange} 
          value={email} 
          placeholder='이메일' 
          errorMessage={isEmail 
            ? isEmailInUse 
              ? '이미 사용중인 이메일입니다'
              : ''
            : '이메일 형식에 맞추어주세요.'} 
        />
        <FormInput
          onChange={handleFullNameChange}
          value={fullName}
          placeholder='닉네임'
          errorMessage={isFullName ? '' : '2자이상 10자이하의 이름을 입력해주세요. '}
        />
        <FormInput
          type='password'
          onChange={handlePasswordChange}
          value={password}
          placeholder='비밀번호'
          errorMessage={isPassword ? '' : '6자이상 18자이하의 비밀번호를 입력해주세요.'}
        />
        <FormInput
          type='password'
          onChange={handleVerifyPasswordChange}
          value={verifyPassword}
          placeholder='비밀번호 확인'
          errorMessage={verifyPassword && isVerifyPassword ? '' : '비밀번호가 일치하지 않습니다.'}
        />
        <Flex justifyContent='space-between'>
          <Button 
            type='submit' 
            disabled={!isSignUpable} 
            style={{ border: 'none' }} 
            borderRadius={'4px'}
            backgroundColor={'#FD9F28'} 
            width={164} 
            height={60}
            hover={{ filter: 'brightness(90%)' }}
            focus={null}
            active={{ filter: 'brightness(80%)' }}
          >생성 / 수정</Button>
          <Button 
            style={{ border: 'none' }}
            borderRadius={'4px'} 
            backgroundColor={'#dddd'} 
            width={'164px'} 
            height={'60px'}
            hover={{ filter: 'brightness(90%)' }}
            focus={null}
            active={{ filter: 'brightness(80%)' }}
            onClick={handleCancelClick} 
          >취소</Button>
        </Flex>
      </form>
    </Flex>
  );
};

SignUpForm.propTypes = {
  onSignUp: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default SignUpForm;
