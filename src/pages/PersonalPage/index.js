import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import PropTypes from 'prop-types';

import Profile from '@domains/UserProfile';
import ZzalFeed from '@domains/Zzal/ZzalFeed';

const PersonalPage = () => {
  const { userId } = useParams();
  const [userData, fetchUserData] = useAxios(`/users/${userId}`);
  
  useEffect(() => {
    fetchUserData();
  }, []);

  const { isLoading, value, error } = userData;

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>에러발생</div>;
  }
  if (!value) {
    return <button onClick={fetchUserData}>불러오기</button>;
  }

  return (
    <>
      <Profile 
        fullName={userData.value.fullName} 
        followers={userData.value.followers}
        following={userData.value.following}
        src={userData.value.image}
        userId={userId}
        handleClick={fetchUserData}
      >
      </Profile>
      <ZzalFeed 
        userId={userId}
        likeZzals={userData.value.likes} 
      ></ZzalFeed>
    </>
  );
};

PersonalPage.propTypes = {
  isAuthorized: PropTypes.bool
};

export default PersonalPage;
