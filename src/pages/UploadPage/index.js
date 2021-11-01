import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import UploadPostForm from '@domains/UploadPostForm';
import Logo from '@components/Logo';
import Title from '@components/Title';
import { STYLE_CONSTANTS } from '@constants/margins';
import styled from '@emotion/styled';

const imageFormData = new FormData();

const UploadPage = () => {
  const { authState } = useAuthorization();
  const [isPostUploaded, setIsPostUploaded] = useState(false);

  const history = useHistory();

  const [createPostAPIState, createPost] = useAxios('/posts/create', {
    method: 'post',
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const handleCreatePost = useCallback(async values => {

    const { title, imageData, channelId } = values;
    if (!(title && imageData && channelId)){
      alert('짤의 제목, 이미지, 카테고리를 모두 선택해주세요!');
      
      return;
    }
    imageFormData.set('title', title);
    imageFormData.set('image', imageData);
    imageFormData.set('channelId', channelId);

    await createPost({
      data: imageFormData
    });
    

  }, [imageFormData, createPost]);

  const handleCancel = useCallback(() => {
    history.push('/');
  }, []);

  useEffect(async () => {
    const { value, error } = createPostAPIState;
    if (error) {
      alert('짤 업로드에 실패하였습니다! 잠시 후에 다시 시도해주세요.');
      
      return; 
    }

    value && setIsPostUploaded(true);
    
  }, [
    createPostAPIState
  ]);

  useEffect(() => {
    isPostUploaded && history.push('/');
  }, [isPostUploaded]);

  return (
    <>
      <FlexStyled column alignItems='center'>
        <Logo link />
        <Title>짤 올리기</Title>
        <UploadPostForm
          initialValues={{ 
            imageUrl: '',
            title: '',
            channelId: ''
          }}
          onSubmit={handleCreatePost} 
          onCancel={handleCancel}
        />
      </FlexStyled>
    </>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADeR_MAIN_MARGIN_TOP_S}px;
`;

export default UploadPage;
