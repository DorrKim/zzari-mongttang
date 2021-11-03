import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import EditPostForm from '@domains/EditPostForm';
import Logo from '@components/Logo';
import { STYLE_CONSTANTS } from '@constants/margins';
import styled from '@emotion/styled';
import AlertModal from '@domains/NotationModal/AlertModal';

const updatePostFormData = new FormData();

const EditPostPage = () => {
  const { authState } = useAuthorization();
  const [isPostUpdated, setIsPostUpdated] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    isLoaded: false,
    title: '',
    imageUrl: '',
    channelId: ''
  });
  const [alertState, setAlertState] = useState({
    isAlertShow: false,
    description: ''
  });

  const history = useHistory();
  const params = useParams();

  const [getPostAPIState, getPost] = useAxios(`/posts/${params.zzalId}`, {
  });
  const [updatePostAPIState, updatePost] = useAxios('/posts/update', {
    method: 'put',
    headers: { 
      Authorization: `bearer ${authState.authToken}` 
    }
  });

  const handleUpdatePost = useCallback(async ({ title, imageUrl, imageData = null, channelId }) => {
    const { title: initialTitle, imageUrl: initialImageUrl, channelId: initialChannelId } = initialFormState;
    if (initialTitle === title && initialImageUrl === imageUrl && initialChannelId === channelId) {
      console.log('not changed at all');
      setIsPostUpdated(true);
      
      return;
    }

    console.log(title, channelId);
    if (!(title && channelId)){
      setAlertState({ isAlertShow: true,
        description: '짤의 제목, 이미지, 카테고리를 모두 선택해주세요!' });
      
      return;
    }

    updatePostFormData.set('postId', params.zzalId);
    updatePostFormData.set('title', title);
    updatePostFormData.set('image', imageData);
    updatePostFormData.set('channelId', channelId);

    await updatePost({
      data: updatePostFormData
    });
    
  }, [updatePostFormData, initialFormState, updatePost, params]);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, []);


  // 
  useEffect(async () => {
    const { value, error } = updatePostAPIState;
    if (error) {
      setAlertState({
        isAlertShow: true,
        description: '짤 수정에 실패하였습니다! 잠시 후에 다시 시도해주세요.'
      });
      
      return; 
    }

    value && setIsPostUpdated(true);
    
  }, [
    updatePostAPIState
  ]);

  useEffect(async () => {
    await getPost();
  }, []);

  useEffect(() => {
    if (getPostAPIState.value){
      const { value: { author: { _id: authorId }, channel: { _id: channelId }, title, image: imageUrl }} = getPostAPIState;
      if (authorId !== authState.myUser._id) {
        console.error('본인의 짤이 아닙니다! 메인페이지로 이동합니다.');
        history.goBack();
      }

      setInitialFormState({ isLoaded: true,
        channelId,
        title,
        imageUrl });
    }
  }, [getPostAPIState, authState]);

  useEffect(() => {
    isPostUpdated && history.goBack();
  }, [isPostUpdated]);

  const { title, imageUrl, channelId } = initialFormState;

  return (
    <>
      <FlexStyled column alignItems='center'>
        <Logo name='edit' link style={{ marginBottom: STYLE_CONSTANTS.margin.NO_HEADER_LOGO_MARGIN_BOTTOM_S }} />
        {initialFormState.isLoaded 
          ? (
            <EditPostForm
              initialValues={{ 
                imageUrl,
                title,
                channelId
              }}
              onSubmit={handleUpdatePost} 
              onCancel={handleCancel}
            />
          )
          : null
        }
      </FlexStyled>
      <AlertModal
        title='경고'
        description={alertState.description}
        visible={alertState.isAlertShow}
        handleClose={() => setAlertState({ 
          isAlertShow: false,
          description: '' })}
      />
    </>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADeR_MAIN_MARGIN_TOP_S}px;
`;

export default EditPostPage;
