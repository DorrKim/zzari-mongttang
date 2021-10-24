const MIN_FULLNAME_LENGTH = 2;
const MAX_FULLNAME_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 18;

export const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  
  return regex.test(email);
};

export const validateFullName = fullName => {
  if (MIN_FULLNAME_LENGTH <= fullName.length 
    && fullName.length <= MAX_FULLNAME_LENGTH) {
    return true;
  }

  return false;
};

export const validatePassword = password => {
  if (MIN_PASSWORD_LENGTH <= password.length 
    && password.length <= MAX_PASSWORD_LENGTH) {
    return true;

  }
  
  return false;
};

export const validateVerifyPassword = (password1, password2) => {
  if (password1 === password2) {
    return true;
  }

  return false;
};
