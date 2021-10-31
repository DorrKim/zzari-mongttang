import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import EditPostForm from '@domains/EditPostForm';

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
    if (!(title && channelId)){
      alert('짤의 제목, 이미지, 카테고리를 모두 선택해주세요!');
      
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
    history.push('/');
  }, []);


  // 
  useEffect(async () => {
    const { value, error } = updatePostAPIState;
    if (error) {
      alert('짤 수정에 실패하였습니다! 잠시 후에 다시 시도해주세요.');
      
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
        history.push('/');
      }

      setInitialFormState({ isLoaded: true,
        channelId,
        title,
        imageUrl });
    }
  }, [getPostAPIState, authState]);

  useEffect(() => {
    isPostUpdated && history.push('/');
  }, [isPostUpdated]);

  const { title, imageUrl, channelId } = initialFormState;

  return (
    <>
      <Flex column alignItems='center'>
        {initialFormState.isLoaded 
          ? (
            <>
              <EditPostForm
                initialValues={{ 
                  imageUrl,
                  title,
                  channelId
                }}
                onSubmit={handleUpdatePost} 
                onCancel={handleCancel}
              />
            </>
          )
          : null
        }
      </Flex>
    </>);
};

export default EditPostPage;
