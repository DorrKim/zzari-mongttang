import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import { useAuthorization } from '@context/AuthorizationProvider';
import EditProfileForm from '@domains/EditProfileForm';


const EditProfilePage = () => {
  const { authState } = useAuthorization();
  const [initialFormState, setInitialFormState] = useState({
    isLoaded: false,
    image: '',
    fullName: ''
  });
  const history = useHistory();

  const [getIsAuthUserAPIState, getAuthUser] = useAxios('/auth-user', {
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const [getMyUserAPIState, getMyUser] = useAxios();

  const [updateFullNameAPIState, updateFullName] = useAxios('/settings/update-user', {
    method: 'put',
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const [updatePasswordAPIState, updatePassword] = useAxios('/settings/update-password', {
    method: 'put',
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const [updateProfileImageAPIState, updateProfileImage] = useAxios('/users/upload-photo', {
    method: 'post',
    headers: {
      Authorization: `bearer ${authState.authToken}`
    }
  });

  const handleEditProfile = useCallback(async values => {
    const { image: initialImage, fullName: initialFullName } = initialFormState;
    if (values.image && initialImage !== values.image) {
      updateProfileImage({
        data: {
          isCover: false,
          image: values.image
        }
      });
    }
    if (values.fullName && initialFullName !== values.fullName) {
      updateFullName({
        data: {
          fullName: values.fullName,
          username: values.fullName
        }
      });
    }

    updatePassword({
      data: {
        password: values.password
      }
    });
  }, []);

  const handleCancel = useCallback(() => {
    confirm('정보수정 페이지에서 나가시겠습니까? 해당 페이지 정보를 잃을 수 있습니다.') && history.push('/');
  });

  useEffect(async () => {
    getMyUser({
      url: `/users/${authState.myUser._id}`
    });
    getAuthUser();
  }, []);

  useEffect(() => {
    const { value: isAuthUserValue, error: isAuthUserError } = getIsAuthUserAPIState;
    const { value: myUserValue, error: myUserError } = getMyUserAPIState;
    if (isAuthUserError || myUserError) {
      alert('본인 확인에 실패하였습니다. 다시 로그인후에 시도해주세요.');
      history.push('/login');
      
      return;
    } 

    if (isAuthUserValue && myUserValue && isAuthUserValue._id === myUserValue._id) {
      const { value: { fullName, image }} = getMyUserAPIState;
      setInitialFormState(initialFormState => ({ 
        ...initialFormState,
        fullName,
        image,
        isLoaded: true
      }));
    } 
  }, [getIsAuthUserAPIState, getMyUserAPIState]);

  const { image, fullName, password } = initialFormState;
  console.log(fullName);
  
  return (
    <>
      <Flex column alignItems='center'>
        {initialFormState.isLoaded 
          ? (<EditProfileForm
            initialValues={{ image,
              fullName,
              password,
              verifyPassword: '' }}
            onEditProfile={handleEditProfile} 
            onCancel={handleCancel}
          />)
          : null
        }
        
      </Flex>
    </>);
};

export default EditProfilePage;
