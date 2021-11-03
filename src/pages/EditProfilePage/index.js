import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import EditProfileForm from '@domains/EditProfileForm';
import styled from '@emotion/styled';
import { STYLE_CONSTANTS } from '@constants/margins';
import Logo from '@components/Logo';
import AlertModal from '@domains/NotationModal/AlertModal';
import ConfirmModal from '@domains/NotationModal/ConfirmModal';

const imageFormData = new FormData();

const EditProfilePage = () => {
  const { authState, updateAuthState } = useAuthorization();
  const [isProfileEdited, setIsProfileEdited] = useState(false);
  const [isProfileEditedAlertShow, setIsProfileEditedAlertShow] = useState(false);
  const [isAuthFailedAlertShow, setIsAuthFailedAlertShow] = useState(false);
  const [isCancelConfirmModalShow, setIsCancelConfirmModalShow] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    isLoaded: false,
    imageUrl: '',
    fullName: ''
  });

  const history = useHistory();

  const headers = useMemo(() => ({ Authorization: `bearer ${authState.authToken}` }), [authState]);

  const [getIsAuthUserAPIState, getAuthUser] = useAxios('/auth-user', {
    headers
  });

  const [getMyUserAPIState, getMyUser] = useAxios();

  const [updateProfileImageAPIState, updateProfileImage] = useAxios('/users/upload-photo', {
    method: 'post',
    headers
  });

  const [updateFullNameAPIState, updateFullName] = useAxios('/settings/update-user', {
    method: 'put',
    headers
  });

  const [updatePasswordAPIState, updatePassword] = useAxios('/settings/update-password', {
    method: 'put',
    headers
  });

  const handleUpdateProfile = useCallback(async values => {
    const { imageData, imageUrl, fullName, password } = values;
    const { imageUrl: initialImage, fullName: initialFullName } = initialFormState;
    const apiList = [];
    // image Changed
    if (imageData && initialImage !== imageUrl) {
      imageFormData.set('isCover', false);
      imageFormData.set('image', imageData);
      apiList.push(updateProfileImage({
        data: imageFormData
      }));
    }
    // fullName Changed
    if (fullName && initialFullName !== fullName) {
      apiList.push(updateFullName({
        data: {
          fullName,
          username: fullName + new Date().toISOString
        }
      }));
    }
    apiList.push(updatePassword({
      data: {
        password
      }
    }));

    await Promise
      .all(apiList)
      .catch(e => console.error(e));

  }, [initialFormState]);

  const handleCancel = useCallback(() => {
    setIsCancelConfirmModalShow(true);
  });

  const handleToLoginPage = useCallback(() => {
    setIsAuthFailedAlertShow(false);
    history.push('/login');
  }, [history]);

  // 최초 페이지 접근 본인 확인
  useEffect(() => {
    if (!authState.myUser) {
      setIsAuthFailedAlertShow(true);
      
      return;
    }
    getMyUser({
      url: `/users/${authState.myUser._id}`
    });
    getAuthUser();
  }, []);

  // validating User
  useEffect(() => {
    const { value: isAuthUserValue, error: isAuthUserError } = getIsAuthUserAPIState;
    const { value: myUserValue, error: myUserError } = getMyUserAPIState;
    const error = isAuthUserError || myUserError;
    if (error) {
      setIsAuthFailedAlertShow(true);
      
      return;
    } 
    const approved = (isAuthUserValue 
      && myUserValue 
      && isAuthUserValue._id === myUserValue._id);
    if (approved) {
      const { value: { fullName, image }} = getMyUserAPIState;
      setInitialFormState(initialFormState => ({ 
        ...initialFormState,
        fullName,
        imageUrl: image,
        isLoaded: true
      }));
    }
  }, [getIsAuthUserAPIState, getMyUserAPIState]);

  // 
  useEffect(async () => {
    const { isLoading: imageLoading, value: imageValue, error: imageError } = updateProfileImageAPIState;
    const { isLoading: fullNameLoading, value: fullNameValue, error: fullNameError } = updateFullNameAPIState;
    const { isLoading: passwordLoading, value: passwordValue, error: passwordError } = updatePasswordAPIState;

    if (imageLoading || fullNameLoading || passwordLoading) {
      return;
    }

    if (imageError || fullNameError || passwordError) {
      imageError && alert('image 변경 실패!');
      fullNameError && alert('fullName 변경 실패!');
      passwordError && alert('password 변경 실패!');

      return;
    }

    if (imageValue || fullNameValue || passwordValue) {
      const image = imageValue ? imageValue.image : authState.myUser.image;
      const fullName = fullNameValue ? fullNameValue.fullName : authState.myUser.fullName;
      updateAuthState({
        authToken: authState.authToken,
        myUser: {
          ...authState.myUser,
          image,
          fullName
        }
      });
      setIsProfileEditedAlertShow(true);
    }
  }, [
    updateFullNameAPIState,
    updatePasswordAPIState, 
    updateProfileImageAPIState
  ]);

  useEffect(() => {
    isProfileEdited && history.push('/');
  }, [isProfileEdited]);

  const { imageUrl, fullName } = initialFormState;
  
  return (
    <>
      <FlexStyled column alignItems='center'>
        <Logo name='edit' link style={{ marginBottom: 40 }}/>
        {initialFormState.isLoaded 
          ? (
            <>
              <EditProfileForm
                initialValues={{ 
                  imageUrl,
                  fullName,
                  password: '',
                  verifyPassword: '' }}
                onEditProfile={handleUpdateProfile} 
                onCancel={handleCancel}
              />
            </>
          )
          : null
        }
        
      </FlexStyled>
      <AlertModal
        title='경고'
        description='본인 확인에 실패하였습니다. </br> 다시 로그인후에 시도해주세요.'
        visible={isAuthFailedAlertShow}
        handleClose={handleToLoginPage}
      />
      <AlertModal
        title='알림'
        description='프로필 정보가 변경되었습니다!'
        visible={isProfileEditedAlertShow}
        handleClose={() => setIsProfileEdited(true)}
      />
      <ConfirmModal 
        title='경고'
        description='정보수정 페이지에서 나가시겠습니까? </br> 해당 페이지 정보를 잃을 수 있습니다.'
        visible={isCancelConfirmModalShow}
        handleClickConfirm={() => history.goBack()}
        handleClickCancel={() => setIsCancelConfirmModalShow(false)}
      />
    </>);
};

const FlexStyled = styled(Flex)`
  margin-top: ${STYLE_CONSTANTS.margin.NO_HEADER_MAIN_MARGIN_TOP}px;
`;

export default EditProfilePage;
