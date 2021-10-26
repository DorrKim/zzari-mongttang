import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Avatar from '@components/Avatar';
import UserInfo from './UserInfo';
import Flex from '@/components/base/Flex';

const ProfileWrapper = styled(Flex)`
  width: 328px;
  height: 120px;
`;


const Profile = ({ fullName, followers, following, src }) => {  

  return (
    <ProfileWrapper>
      <Avatar 
        src={src} 
        size={120}
        onClick={() => alert('a')}
      />
      <UserInfo fullName={fullName} followers={followers} following={following} /> 
    </ProfileWrapper>
  );
};

Profile.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array.isRequired,
  src: PropTypes.string
};

export default Profile;
