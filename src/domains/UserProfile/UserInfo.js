import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Flex from '@base/Flex';
import Text from '@base/Text';
import FollowContainer from './FollowContainer';
import FollowToggle from './FollowToggle';

const UserInfoWrapper = styled(Flex)`
  width: 160px;
  margin-left: 16px;
`;

const UserName = styled(Text)`
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 160px;
  margin: 8px 16px;
`;

const UserInfo = ({ fullName, followers, following }) => {
  return (
    <UserInfoWrapper column alignItems='center' justifyContent='space-between'>
      <UserName bold size='lg' >
        {fullName}
      </UserName>
      <FollowContainer 
        followers={followers} 
        following={following}/>
      <FollowToggle />
    </UserInfoWrapper>
  );
};

UserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array
};

export default UserInfo;
