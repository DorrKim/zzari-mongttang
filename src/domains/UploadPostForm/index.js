import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import useForm from '@hooks/useForm';
import { validateUploadPost } from '@library/validate';
import Uploader from '@domains/Uploader';
import MainCategory from '@domains/Category';
import styled from '@emotion/styled';


const UPLOAD_POST_ERROR_MESSAGES = {
  image: '이미지 형식만을 선택해주세요!',
  title: '제목을 입력해 주세요!',
  category: '카테고리를 반드시 하나 선택하세요'
};

let reader = null;

const UploadPostForm = ({ initialValues, onSubmit, onCancel }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate: validateUploadPost
  });
  const [errorMessage, setErrorMessage] = useState(error);

  const handleCancelClick = useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const makeImageDataToUrl = useCallback(changedFile => {
    if (!reader){
      reader = new FileReader();
    }
    if (!changedFile) {
      
      return;
    }
    
    reader.readAsDataURL(changedFile);
  }, [reader]);

  const handleFileChanged = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();

    const changedFile = e.dataTransfer
      ? e.dataTransfer.files[0]
      : e.target.files[0];
    if (!changedFile) {
      return;
    }
      
    if (changedFile.type.includes('image')){
      handleChange({ name: 'imageData',
        value: changedFile });
      makeImageDataToUrl(changedFile);
    } else {
      alert(UPLOAD_POST_ERROR_MESSAGES.image);
    }
  }, [makeImageDataToUrl, handleChange]);

  const handleCategoryChange = useCallback(value => {
    handleChange({ name: 'channelId',
      value });
  }, [handleChange]);

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
        const { [name]: errorMessage } = UPLOAD_POST_ERROR_MESSAGES;
        acc[name] = errorMessage;
      
        return acc;
      }, {});
    setErrorMessage(newErrorMessage);
  }, [error]);
  
  const { title, imageUrl, channelId } = values;
    
  return (
    <Form onSubmit={handleSubmit}>
      <Uploader 
        droppable
        width={350}
        height={350}
        type='square'
        alt='profileImage'
        src={imageUrl ? imageUrl : ''}
        onChange={handleFileChanged}
      />
      <FormInput
        onChange={value => handleChange({ name: 'title',
          value })}
        value={title}
        placeholder='제목'
        errorMessage={errorMessage.title
        }
      />
      <MainCategory channelId={channelId} onChange={handleCategoryChange} />
      <ButtonContainer>
        <Button 
          type='submit' 
          disabled={isLoading} 
          style={{ border: 'none' }} 
          borderRadius={'4px'}
          backgroundColor={'#FD9F28'} 
          width={164} 
          height={60}
        >짤 올리기</Button>
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
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const ButtonContainer = styled.div`
display: flex;
gap: 30px;
`;

UploadPostForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default UploadPostForm;
