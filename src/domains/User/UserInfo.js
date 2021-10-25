import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Flex from '@/components/base/Flex';
import Text from '@components/base/Text';
import FollowContainer from './FollowContainer';
import FollowSwitch from './FollowSwitch';

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

const UserInfo = ({ fullName, followers, following, onClickFollowItem, onClickFollowBtn }) => {
  return (
    <UserInfoWrapper column alignItems='center' justifyContent='space-between'>
      <UserName bold size='lg' >
        {fullName}
      </UserName>
      <FollowContainer onClick = {onClickFollowItem}
        followers={followers} 
        following={following}/>
      <FollowSwitch onClick={onClickFollowBtn}/>
    </UserInfoWrapper>
  );
};

UserInfo.propTypes = {
  fullName: PropTypes.string.isRequired,
  followers: PropTypes.array,
  following: PropTypes.array,
  onClickFollowItem: PropTypes.func,
  onClickFollowBtn: PropTypes.func
};

export default UserInfo;
