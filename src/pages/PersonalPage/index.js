import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Profile from '@domains/UserProfile';
import ZzalFeed from '@domains/Zzal/ZzalFeed';

const MainInner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const PersonalPage = () => {
  const { userId } = useParams();
  const [userAPIState, fetchUserAPIState] = useAxios(`/users/${userId}`);
  
  useEffect(() => {
    fetchUserAPIState();
  }, [userId]);

  const { isLoading, value, error } = userAPIState;

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <div>에러발생</div>;
  }
  if (!value) {
    return <button onClick={fetchUserAPIState}>불러오기</button>;
  }

  
  return (
    <main>
      <MainInner>
        <Profile 
          fullName={userAPIState.value.fullName} 
          followers={userAPIState.value.followers}
          following={userAPIState.value.following}
          src={userAPIState.value.image}
          userId={userId}
          fetchUserAPIState={fetchUserAPIState}
        >
        </Profile>
        <ZzalFeed 
          userId={userId}
          likeZzals={userAPIState.value.likes} 
        ></ZzalFeed>
      </MainInner>
    </main>
  );
};

PersonalPage.propTypes = {
  isAuthorized: PropTypes.bool
};

export default PersonalPage;
