import React, { useCallback, useEffect, useState } from 'react';
// import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import FormInput from '@/components/FormInput';
import Flex from '@base/Flex';
import Button from '@base/Button';
import { validateEmail } from '@library/validate';

const LoginForm = ({ onLogin, onToSubmitPage, ...props }) => {
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoginFailed, setisLoginFailed] = useState(false);

  useEffect(() => {
    setIsEmail(validateEmail(email));
  }, [email]);

  const handleEmailChange = useCallback(value => {
    setEmail(value);
    setisLoginFailed(false);
  }, []);

  const handlePasswordChange = useCallback(value => {
    setPassword(value);
    setisLoginFailed(false);
  }, []);

  const handleLogin = useCallback(async e => {
    e.preventDefault();
    if (!isEmail) {
      return;
    }

    const error = onLogin && await onLogin({ email,
      password });
      
    error && setisLoginFailed(true);
  });

  const handleToSubmitPage = useCallback(() => {
    onToSubmitPage && onToSubmitPage();
  });

  return (
    <Flex justifyContent='center'>
      <form onSubmit={handleLogin} {...props}>
        <FormInput 
          onChange={handleEmailChange} 
          value={email} 
          placeholder='이메일' 
          errorMessage={!isEmail 
            ? '이메일 형식에 맞추어주세요.'
            : ''
          } 
        />
        <FormInput
          type='password'
          onChange={handlePasswordChange}
          value={password}
          placeholder='비밀번호'
          errorMessage={isLoginFailed && isEmail
            ? '로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요'
            : ''}
        />
        <Button 
          type='submit'
          disabled={!isEmail}
          style={{ 
            border: 'none',
            display: 'block',
            marginBottom: 16 }}
          backgroundColor={'#FD9F28'} 
          borderRadius={'4px'} 
          width={328}
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
          width={328} 
          height={60}
          hover={{ filter: 'brightness(90%)' }}
          focus={null}
          active={{ filter: 'brightness(80%)' }}
          onClick={handleToSubmitPage} 
        >
            회원가입
        </Button>
      </form>
    </Flex>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onToSubmitPage: PropTypes.func
};

export default LoginForm;
