import React from 'react';

import SignUpForm from '@domains/SignUpForm';
import LoginForm from '@domains/LoginForm';

export default {
  title: 'Domains/Forms'
};

export const SignUp = () => {
  return <SignUpForm 
    onSignUp={({ email, fullName, password }) => alert(`email : ${email} fullName : ${fullName} password : ${password}`)} 
    onCancel={() => alert('cancelSignUp')}
  />;
};

export const LogIn = () => {
  return <LoginForm
    onLogin={({ email, password }) => alert(`email : ${email} password : ${password}`)}
    onToSubmitPage={() => alert('toSubmitPage!')}
  />;
};
