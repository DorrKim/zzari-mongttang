import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import FormInput from '@/components/FormInput';
import Flex from '@base/Flex';
import Button from '@base/Button';
import { validateEmail } from '@library/validate';
import { loginAPI } from '@api/loginAPI';

const LoginForm = ({ ...props }) => {
  const [email, setEmail] = useState({
    value: '',
    isEmail: false,
    inUse: false
  });
  const [password, setPassword] = useState({
    value: '',
    isPassword: true
  });
  const [isLoginFailed, setisLoginFailed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setEmail(email => validateEmail(email.value)
      ? { ...email,
        isEmail: true } 
      : { ...email,
        isEmail: false });
  }, [email.value]);

  const handleEmailChange = useCallback(value => {
    setEmail({ ...email,
      value });
    setisLoginFailed(false);
  }, [email]);

  const handlePasswordChange = useCallback(value => {
    setPassword({ ...password,
      value });
    setisLoginFailed(false);

  }, [password]);

  const handleLogin = useCallback(async e => {
    e.preventDefault();
    if (!email.isEmail) {
      return;
    }

    const user = await loginAPI.postLogin({
      email: email.value,
      password: password.value
    });

    if (!user) {
      setisLoginFailed(true);
      
      return;
    }

    history.push('/');
  });

  const handleCancel = useCallback(() => {
    if (window.confirm('로그인 페이지에서 나가시겠습니까? 입력한 정보는 저장되지 않습니다.')){
      history.push('/');
    }
  });

  return (
    <Flex justifyContent='center'>
      <form {...props}>
        <FormInput 
          onChange={handleEmailChange} 
          value={email.value} 
          placeholder='이메일' 
          errorMessage={!email.isEmail 
            ? '이메일 형식에 맞추어주세요.'
            : ''
          } 
        />
        <FormInput
          type='password'
          onChange={handlePasswordChange}
          value={password.value}
          placeholder='비밀번호'
          errorMessage={isLoginFailed && email.isEmail
            ? '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요'
            : ''}
        />
        <Flex justifyContent='space-between'>
          <Button 
            type='submit' 
            width={164} 
            height={60}
            backgroundColor={'#FD9F28'} 
            borderRadius={'4px'} 
            style={{ border: 'none' }} 
            onClick={handleLogin}
          > 
          로그인 
          </Button>
          <Button 
            width={164} 
            height={60}
            backgroundColor={'#dddd'}
            borderRadius={'4px'}
            style={{ border: 'none' }} 
            onClick={handleCancel} 
          >
            취소
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default LoginForm;
