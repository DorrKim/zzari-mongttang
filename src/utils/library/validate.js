const MIN_FULLNAME_LENGTH = 2;
const MAX_FULLNAME_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 18;

export const validateEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  
  return regex.test(email);
};

export const validateFullName = fullName => (MIN_FULLNAME_LENGTH <= fullName?.length 
    && fullName.length <= MAX_FULLNAME_LENGTH); 

export const validatePassword = password => (MIN_PASSWORD_LENGTH <= password?.length 
    && password.length <= MAX_PASSWORD_LENGTH);

export const validateVerifyPassword = (password1, password2) => password1 === password2;

export const validateTitle = title => title.length > 0;

export const validateImage = imageData => imageData.type.includes('image');

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

export const validateEditProfile = values => Object
  .keys(values)
  .reduce((acc, name) => {
    switch (name) {
      case 'imageData':
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

export const validateUploadPost = values => Object
  .keys(values)
  .reduce((acc, name) => {
    switch (name) {
      case 'imageData':
        !validateImage(values[name])
          ? acc[name] = true
          : null;

        return acc;
      case 'title':
        !validateTitle(values[name])
          ? acc[name] = true
          : null;

        return acc;
      default:
        return acc;
    }
  }, {});
