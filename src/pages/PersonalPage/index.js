import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import useAxios from '@hooks/useAxios';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Profile from '@domains/UserProfile';
import ZzalFeed from '@domains/Zzal/ZzalFeed';
import Spinner from '@base/Spinner';
import useQuery from '@hooks/useQuery';

const MainInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalPage = () => {
  const { userId } = useParams();
  const tabSelectIndex = parseInt(useQuery().get('tabIdx'), 10);
  const history = useHistory();
  const [userAPIState, fetchUserAPIState] = useAxios(`/users/${userId}`);
  
  useEffect(() => {
    fetchUserAPIState();
  }, [userId]);
  const { isLoading, value, error } = userAPIState;

  if (isLoading) {
    return <Spinner style={{ height: '80vh' }} />;
  }

  if (error) {
    history.push('/error');
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
          tabInitialIndex={tabSelectIndex}
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
