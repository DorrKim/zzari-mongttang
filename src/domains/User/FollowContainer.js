import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@/components/base/Flex';
import Text from '@components/base/Text';
import styled from '@emotion/styled';

const FollowWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 8px;
`; 

const FollowItem = styled(Flex)`
  margin: 0 8px
`;
const FollowContainer = ({ followers = [], following = [] }) => {
  return (
    <FollowWrapper justifyContent="center" >
      <FollowItem column alignItems='center' >
        <Text bold >{`${followers.length}`}</Text>
        <Text bold size="sm" >팔로워</Text>
      </FollowItem> 
      <FollowItem column alignItems='center'>
        <Text bold>{`${following.length}`}</Text>
        <Text bold size="sm">팔로잉</Text>
      </FollowItem>
    </FollowWrapper>
  );
};

FollowContainer.propTypes = {
  followers: PropTypes.array,
  following: PropTypes.array
};

export default FollowContainer;
