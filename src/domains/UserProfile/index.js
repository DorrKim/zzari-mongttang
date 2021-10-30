import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useAxios from '@hooks/useAxios';

import Avatar from '@components/Avatar';
import UserInfo from './UserInfo';
import Flex from '@components/base/Flex';
import FollowToggle from './FollowToggle';
import FollowContainer from './FollowContainer';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYxNzk1YjJhYTFmOTY3M2EyMjkyYTBkOCIsImVtYWlsIjoienphcmkzQGFiYy5jb20ifSwiaWF0IjoxNjM1NDQyNDA3fQ.NMICSNByNDkdbMLiiomT2WDU74yiV7jJAwf6TsktbAI';

const ProfileWrapper = styled(Flex)`
  width: 328px;
  height: 120px;
`;

const Profile = ({ 
  myUserId = '61795b2aa1f9673a2292a0d8', 
  fullName, 
  followers,
  following, 
  src, 
  userId 
}) => {
  const [countFollowing, setcountFollowing] = useState(following.length);
  const [currFollowId, setCurrFollowId] = useState(() => {
    return followers.find(follow => follow.follower._id === myUserId)?._id;
  });

  const [unfollowData, fetchUnFollowData] = useAxios('/follow/delete', {
    method: 'delete',
    headers: {
      Authorization: `bearer ${TOKEN}`
    }     
  });
  const [followData, fetchFollowData] = useAxios('/follow/create', {
    method: 'post',
    headers: {
      Authorization: `bearer ${TOKEN}`
    }     
  });

  const isMyProfile = useMemo(() => myUserId === userId, [myUserId, userId]);

  const followState = useMemo(() => !!currFollowId, [currFollowId]);

  useEffect(() => {
    if (followData.value) {
      setCurrFollowId(followData.value._id);
      setcountFollowing(prevState => prevState + 1);
    }
  }, [followData.value]);

  useEffect(() => {
    if (unfollowData.value) {  
      setcountFollowing(prevState => prevState - 1);
    }
  }, [unfollowData.value]);

  const handleClickUnFollow = useCallback(async () => { 
    if (!currFollowId) {
      
      return; 
    }
    await fetchUnFollowData({
      data: {
        id: currFollowId
      }
    });
    setCurrFollowId(null);
  }, [currFollowId, fetchUnFollowData, setCurrFollowId]);

  const handleClickFollow = async () => {
    if (currFollowId) {
      return;
    }
    fetchFollowData({
      data: {
        userId
      }
    });
  };

  const followToggleButton = (
    <FollowToggle 
      isMyProfile={isMyProfile} 
      followState={followState} 
      handleClickFollow={handleClickFollow}
      handleClickUnFollow={handleClickUnFollow}/>
  );

  const followContainer = (
    <FollowContainer 
      countFollower={followers.length} 
      countFollowing={countFollowing}/>
  );

  return (
    <ProfileWrapper>
      <Avatar 
        src={src} 
        size={120}
      />
      <UserInfo 
        fullName={fullName} 
        followContainer={followContainer}
        followToggleButton={followToggleButton} 
      /> 
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array.isRequired,
  src: PropTypes.string,
  userId: PropTypes.string,
  myUserId: PropTypes.bool,
  handleClick: PropTypes.func
};

export default Profile;
