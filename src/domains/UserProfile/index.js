import React from 'react';
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
  userId,
  handleClick 
}) => {
  const isMyProfile = myUserId === userId;
  const myFollow = followers.find(follow => follow.follower._id === myUserId);
  const [, fetchUnFollowData] = useAxios('/follow/delete', {
    method: 'delete',
    data: {
      id: myFollow?._id
    },
    headers: {
      Authorization: `bearer ${TOKEN}`
    }     
  });
  const [, fetchFollowData] = useAxios('/follow/create', {
    method: 'post',
    data: {
      userId
    },
    headers: {
      Authorization: `bearer ${TOKEN}`
    }     
  });

  const handleClickUnFollow = async () => {
    await fetchUnFollowData();
    handleClick && handleClick();
  };

  const handleClickFollow = async () => {
    await fetchFollowData();
    handleClick && handleClick();
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
        followState={!!myFollow}
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
