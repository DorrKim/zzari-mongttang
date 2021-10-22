import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Button from '@base/Button';
import { validateEmail, validateFullName, validatePassword, validateVerifyPassword } from '@library/validate';
import { loginAPI } from '@api/loginAPI';
import FormInput from '@components/FormInput';
import Flex from '@/components/base/Flex';

const SignUpForm = () => {
  const [email, setEmail] = useState({
    value: '',
    isEmail: false,
    inUse: false
  });
  const [fullName, setFullName] = useState({
    value: '',
    isFullName: false
  });
  const [password, setPassword] = useState({
    value: '',
    isPassword: false
  });
  const [verifyPassword, setVerifyPassword] = useState({
    value: '',
    isVerifyPassword: false
  });
  const [isSignUpable, setIsSignUpable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (email.isEmail 
      && fullName.isFullName 
      && password.isPassword 
      && verifyPassword.isVerifyPassword
    ) {
      setIsSignUpable(true);
    } else {
      setIsSignUpable(false);
    }
  }, [email.isEmail, fullName.isFullName, password.isPassword, verifyPassword.isVerifyPassword]);

  useEffect(() => {
    setEmail(email => validateEmail(email.value)
      ? { ...email,
        isEmail: true } 
      : { ...email,
        isEmail: false });
    setFullName(fullName => validateFullName(fullName.value)
      ? { ...fullName,
        isFullName: true }
      : { ...fullName,
        isFullName: false });
    setPassword(password => validatePassword(password.value)
      ? { ...password,
        isPassword: true }
      : { ...password,
        isPassword: false });
    setVerifyPassword(verifyPassword => validateVerifyPassword(password.value, verifyPassword.value)
      ? { ...verifyPassword,
        isVerifyPassword: true }
      : { ...verifyPassword,
        isVerifyPassword: false });
  }, [email.value, fullName.value, password.value, verifyPassword.value]);

  const handleEmailChange = useCallback(value => {
    setEmail({ ...email,
      value,
      inUse: false });
  }, [email]);

  const handleFullNameChange = useCallback(value => {
    setFullName({ ...fullName,
      value });
  }, [fullName]);

  const handlePasswordChange = useCallback(value => {
    setPassword({ ...password,
      value });
  }, [password]);

  const handleVerifyPasswordChange = useCallback(value => {
    setVerifyPassword({ ...verifyPassword,
      value });
  }, [verifyPassword]);

  const handleSignUp = useCallback(async e => {
    e.preventDefault();
    if (!isSignUpable){
      return;
    }
    setIsSignUpable(false);
    const data = await loginAPI.postSignUp({
      email: email.value,
      fullName: fullName.value,
      password: password.value
    });

    if (!data) {
      setEmail({ ...email,
        inUse: true });
      setIsSignUpable(true);
      
      return;
    }

    await loginAPI.postLogin({
      email: email.value,
      password: password.value
    });

    history.push('/');
  });

  const handleCancel = useCallback(() => {
    if (window.confirm('회원가입 페이지에서 나가시겠습니까? 입력한 정보는 저장되지 않습니다.')){
      history.push('/');
    }
  });
  
  return (
    <Flex justifyContent='center'>
      <form>
        <FormInput 
          onChange={handleEmailChange} 
          value={email.value} 
          placeholder='이메일' 
          errorMessage={email.isEmail 
            ? email.inUse 
              ? '이미 사용중인 이메일입니다'
              : ''
            : '이메일 형식에 맞추어주세요.'} 
        />
        <FormInput
          onChange={handleFullNameChange}
          value={fullName.value}
          placeholder='닉네임'
          errorMessage={fullName.isFullName ? '' : '2자이상 10자이하의 이름을 입력해주세요. '}
        />
        <FormInput
          type='password'
          onChange={handlePasswordChange}
          value={password.value}
          placeholder='비밀번호'
          errorMessage={password.isPassword ? '' : '6자이상 18자이하의 비밀번호를 입력해주세요.'}
        />
        <FormInput
          type='password'
          onChange={handleVerifyPasswordChange}
          value={verifyPassword.value}
          placeholder='비밀번호 확인'
          errorMessage={verifyPassword.value && verifyPassword.isVerifyPassword ? '' : '비밀번호가 일치하지 않습니다.'}
        />
        <Flex justifyContent='space-between'>
          <Button type='submit' disabled={!isSignUpable} onClick={handleSignUp} style={{ border: 'none' }} borderRadius={'4px'} backgroundColor={'#FD9F28'} width={'164px'} height={'60px'} >생성 / 수정</Button>
          <Button onClick={handleCancel} style={{ border: 'none' }} borderRadius={'4px'} backgroundColor={'#dddd'} width={'164px'} height={'60px'} >취소</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignUpForm;
