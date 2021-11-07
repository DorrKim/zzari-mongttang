import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import UploadPostForm from '@domains/UploadPostForm';
import Logo from '@components/Logo';
import { STYLE_CONSTANTS } from '@constants/margins';
import styled from '@emotion/styled';
import AlertModal from '@domains/NotationModal/AlertModal';
import useQuery from '@hooks/useQuery';

const imageFormData = new FormData();

const UploadPage = () => {
  const { authState } = useAuthorization();
  const [isPostUploaded, setIsPostUploaded] = useState(false);
  const [alertModalState, setAlertModalState] = useState({
    visible: false,
    description: ''
  });

  const history = useHistory();
  const channelId = useQuery().get('channelId');

  const [createPostAPIState, createPost] = useAxios('/posts/create', {
    method: 'post',
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const handleCreatePost = useCallback(async values => {
    if (createPostAPIState.isLoading) {
      return;
    }

    const { title, imageData, channelId } = values;
    if (!(title && imageData && channelId)){
      setAlertModalState({ 
        visible: true,
        description: '짤의 제목, 이미지, 카테고리를 모두 선택해주세요!' 
      });
      
      return;
    }
    imageFormData.set('title', title);
    imageFormData.set('image', imageData);
    imageFormData.set('channelId', channelId);

    await createPost({
      data: imageFormData
    });
    

  }, [imageFormData, createPost, createPostAPIState]);

  const handleCancel = useCallback(() => {
    history.goBack();
  }, []);

  useEffect(async () => {
    const { value, error } = createPostAPIState;
    if (error) {
      setAlertModalState({ 
        visible: true,
        description: '짤 업로드에 실패하였습니다! 잠시 후에 다시 시도해주세요.' 
      });
      
      return; 
    }
    value && setIsPostUploaded(true);
  }, [
    createPostAPIState
  ]);

  useEffect(() => {
    isPostUploaded && history.push({
      pathname: `/user/${authState.myUser?._id}`,
      search: '?tabIdx=1'
    });
  }, [isPostUploaded]);

  return (
    <>
      <FlexStyled column alignItems='center'>
        <Logo name='upload' link style={{ marginBottom: STYLE_CONSTANTS.margin.NO_HEADER_LOGO_MARGIN_BOTTOM_S }} />
        <UploadPostForm
          initialValues={{ 
            imageUrl: '',
            title: '',
            channelId
          }}
          onSubmit={handleCreatePost} 
          onCancel={handleCancel}
        />
      </FlexStyled>
      <AlertModal
        title='경고!'
        visible={alertModalState.visible}
        description={alertModalState.description}
        handleClose={() => setAlertModalState({ 
          visible: false,
          description: '' })}
      />
    </>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADeR_MAIN_MARGIN_TOP_S}px;
`;

export default UploadPage;
