import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import Flex from '@base/Flex';
import useForm from '@hooks/useForm';
import { validateForm } from '@library/validate';

const EDIT_PROFILE_ERROR_MESSAGES = {
  fullName: '2자이상 10자이하의 이름을 입력해주세요.',
  password: '6자이상 18자이하의 비밀번호를 입력해주세요.',
  verifyPassword: '비밀번호가 일치하지 않습니다.'
};

const EditProfileForm = ({ initialValues, onEditProfile, onCancel }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: onEditProfile,
    validate: validateForm
  });
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    const newErrorMessage = Object
      .keys(error)
      .reduce((acc, name) => {
        const { [name]: errorMessage } = EDIT_PROFILE_ERROR_MESSAGES;
        acc[name] = errorMessage;
      
        return acc;
      }, {});
    setErrorMessage(newErrorMessage);
  }, [error]);

  const handleCancelClick = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);
  
  const { fullName, password, verifyPassword } = values;
    
  return (
    <Flex justifyContent='center'>
      <form onSubmit={handleSubmit}>
        {/* <div>Image Uploader...</div> */}
        <FormInput
          onChange={value => handleChange({ name: 'fullName',
            value })}
          value={fullName}
          placeholder='닉네임 (2자이상 10자이하)'
          errorMessage={errorMessage.fullName
          }
        />
        <FormInput
          type='password'
          onChange={value => handleChange({ name: 'password',
            value })}
          value={password}
          placeholder='변경할 비밀번호 (6자이상 18자이하)'
          errorMessage={errorMessage.password
          }
        />
        <FormInput
          type='password'
          onChange={value => handleChange({ name: 'verifyPassword',
            value })}
          value={verifyPassword}
          placeholder='변경할 비밀번호 확인'
          errorMessage={errorMessage.verifyPassword
          }
        />
        <Flex justifyContent='space-between'>
          <Button 
            type='submit' 
            disabled={isLoading} 
            style={{ border: 'none' }} 
            borderRadius={'4px'}
            backgroundColor={'#FD9F28'} 
            width={164} 
            height={60}
          >수정</Button>
          <Button 
            style={{ border: 'none' }}
            borderRadius={'4px'} 
            backgroundColor={'#dddd'} 
            width={164} 
            height={60}
            onClick={handleCancelClick} 
          >취소</Button>
        </Flex>
      </form>
    </Flex>
  );
};

EditProfileForm.propTypes = {
  initialValues: PropTypes.object,
  onEditProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditProfileForm;
