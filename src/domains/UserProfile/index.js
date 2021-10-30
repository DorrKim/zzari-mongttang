import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import useAxios from '@hooks/useAxios';

import Avatar from '@components/Avatar';
import UserInfo from './UserInfo';
import Flex from '@components/base/Flex';

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
  /**
   *  1. follower._id === myUserId 인 모든 follower에 대해서 하나만 남기고 모든 팔로우 취소
   *  2. follow._id를 상태로 저장
   *  3. 
   */
  const [currFollowId, setCurrFollowId] = useState(() => {
    return followers.find(follow => follow.follower._id === myUserId)?._id;
  });

  const [, fetchUnFollowData] = useAxios('/follow/delete', {
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
    }
  }, [followData.value]);

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

  return (
    <ProfileWrapper>
      <Avatar 
        src={src} 
        size={120}
      />
      <UserInfo 
        fullName={fullName} 
        followers={followers} 
        following={following} 
        isMyProfile={isMyProfile}
        followState={followState}
        handleClickUnFollow={handleClickUnFollow} 
        handleClickFollow={handleClickFollow} 
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
