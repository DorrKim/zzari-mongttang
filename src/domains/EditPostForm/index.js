import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@base/Button';
import FormInput from '@components/FormInput';
import Flex from '@base/Flex';
import useForm from '@hooks/useForm';
import { validateEditPost } from '@library/validate';
import Uploader from '@domains/Uploader';
import CategoryList from '@domains/Category/CategoryList';
import CategoryChip from '@domains/Category/CategoryChip';


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

  const handleCategoryChange = useCallback(e => {
    handleChange({ name: 'channelId',
      value: e.id });
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
  
  const { title, imageUrl } = values;
    
  return (
    <form onSubmit={handleSubmit}>
      <Flex column alignItems='center'>
        <Uploader 
          droppable
          width={328}
          height={248}
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
        <CategoryList selectedIndex={0} onChange={handleCategoryChange}>
          <CategoryChip id='617442532f037c2ea0595a96' name='행복'/>
          <CategoryChip id='61755fa5359c4371f68ac695' name='홍중'/>
          <CategoryChip id='617aea895bdac52c86785f2f' name='멘붕'/>
          <CategoryChip id='617aea975bdac52c86785f34' name='화남'/>
        </CategoryList>
        <Flex justifyContent='space-between'>
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
        </Flex>
      </Flex>
    </form>
  );
};

EditPostForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default EditPostForm;
