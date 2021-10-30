const MIN_FULLNAME_LENGTH = 2;
const MAX_FULLNAME_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 18;

export const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  
  return regex.test(email);
};

export const validateFullName = fullName => {
  if (MIN_FULLNAME_LENGTH <= fullName?.length 
    && fullName.length <= MAX_FULLNAME_LENGTH) {
    return true;
  }

  return false;
};

export const validatePassword = password => {
  if (MIN_PASSWORD_LENGTH <= password?.length 
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

export const validateTitle = title => {
  if (title.length > 0){
    return true;
  }
  
  return false;
};

export const validateImage = imageData => {
  if (imageData.type.includes('image')){
    return true;
  }

  return false;
};

export const validateEditProfile = values => Object
  .keys(values)
  .reduce((acc, name) => {
    switch (name) {
      case 'image':
        !validateImage(values[name])
          ? acc[name] = true
          : null;

        return acc;
      case 'fullName':
        !validateFullName(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      case 'password':
        !validatePassword(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      case 'verifyPassword':
        !validateVerifyPassword(values[name], values.password)
          ? acc[name] = true
          : null;
      
        return acc;
      default:
        return acc;
    }
  }, {});

export const validateSignUp = values => Object
  .keys(values)
  .reduce((acc, name) => {
    switch (name) {
      case 'email':
        !validateEmail(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      case 'fullName':
        !validateFullName(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      case 'password':
        !validatePassword(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      case 'verifyPassword':
        !validateVerifyPassword(values[name], values.password)
          ? acc[name] = true
          : null;
      
        return acc;
      default:
        return acc;
    }
  }, {});

export const validateLogin = values => Object
  .keys(values)
  .reduce((acc, name) => {
    switch (name) {
      case 'email':
        !validateEmail(values[name])
          ? acc[name] = true
          : null;
      
        return acc;
      default:
        return acc;
    }
  }, {});
