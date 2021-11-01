import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import useForm from '@hooks/useForm';
import { validateSignUp } from '@library/validate';
import Uploader from '@domains/Uploader';
import Divider from '@base/Divider';
import colors from '@constants/colors';
import styled from '@emotion/styled';


const EDIT_PROFILE_ERROR_MESSAGES = {
  image: '이미지 형식만을 선택해주세요!',
  fullName: '2자이상 10자이하의 이름을 입력해주세요.',
  password: '6자이상 18자이하의 비밀번호를 입력해주세요.',
  verifyPassword: '비밀번호가 일치하지 않습니다.'
};

let reader = null;

const EditProfileForm = ({ initialValues, onEditProfile, onCancel }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit: onEditProfile,
    validate: validateSignUp
  });
  const [errorMessage, setErrorMessage] = useState(error);

  const handleCancelClick = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const makeImageDataToUrl = useCallback(changedFile => {
    if (!changedFile) {
      
      return;
    }

    if (!reader){
      reader = new FileReader();
    }
    
    reader.readAsDataURL(changedFile);
  }, [reader]);

  const handleFileChanged = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    const changedFile = e.dataTransfer?.files[0] || e.target.files[0];

    if (!changedFile) {
      return;
    }

    if (changedFile.type.includes('image')){
      handleChange({ name: 'imageData',
        value: changedFile });
      makeImageDataToUrl(changedFile);
    } else {
      alert(EDIT_PROFILE_ERROR_MESSAGES.image);
      handleChange({ name: 'imageData',
        value: null });
    }
  }, [makeImageDataToUrl, handleChange]);

  useEffect(() => {
    const handleLoadedUrl = () => {
      handleChange({ name: 'imageUrl',
        value: reader.result });
    };

    reader?.addEventListener('load', handleLoadedUrl);

    return () => reader?.removeEventListener('load', handleLoadedUrl);
  }, [reader]);

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
  
  const { fullName, password, verifyPassword, imageUrl } = values;
    
  return (
    <Form onSubmit={handleSubmit}>
      <Uploader 
        droppable
        width={150}
        height={150}
        type='circle'
        alt='profileImage'
        src={imageUrl || ''}
        onChange={handleFileChanged} 
      />
      <Divider size={30} color={colors.PRIMARY_BACKGROUND}/>
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
      <ButtonContainer>
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
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
display:flex;
flex-direction: column;
align-items: center;
gap: 5px;
`;

const ButtonContainer = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

EditProfileForm.propTypes = {
  initialValues: PropTypes.object,
  onEditProfile: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditProfileForm;
