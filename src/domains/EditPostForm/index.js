import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import useForm from '@hooks/useForm';
import { validateEditPost } from '@library/validate';
import Uploader from '@domains/Uploader';
import styled from '@emotion/styled';
import MainCategory from '@domains/Category';


const UPLOAD_POST_ERROR_MESSAGES = {
  image: '이미지 형식만을 선택해주세요!',
  title: '제목을 입력해 주세요!',
  channelId: '카테고리를 선택해주세요!'
};

let reader = null;

const EditPostForm = ({ initialValues, onSubmit, onCancel }) => {
  const { values, isLoading, error, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit,
    validate: validateEditPost
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
        alt='zzal'
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
        <ButtonStyled 
          type='submit' 
          disabled={isLoading} 
          backgroundColor={'#FD9F28'} 
        >짤 올리기</ButtonStyled>
        <ButtonStyled 
          backgroundColor={'#dddd'} 
          onClick={handleCancelClick} 
        >취소</ButtonStyled>
      </ButtonContainer>
    </Form>
  );
};

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`;

const ButtonContainer = styled.div`
display: flex;
gap: 30px;
`;

const ButtonStyled = styled(Button)`
border-radius: 4px;
border: none;
width: 164px;
height: 60px;
`;


EditPostForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditPostForm;
