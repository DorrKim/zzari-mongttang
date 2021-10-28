import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Avatar from '@components/Avatar';
import UserInfo from './UserInfo';
import Flex from '@components/base/Flex';


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
  onClick 
}) => {  
  const isMyProfile = myUserId === userId;
  const followState = followers.some(follow => follow.follower._id === myUserId);
  
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
        onClick={onClick} 
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
  onClick: PropTypes.func
};

export default Profile;
