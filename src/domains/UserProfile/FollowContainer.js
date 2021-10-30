import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import Text from '@base/Text';
import styled from '@emotion/styled';

const FollowWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 8px;
`; 

const FollowItem = styled(Flex)`
  margin: 0 12px;
  cursor: pointer;
`;
const FollowContainer = ({ countFollower, countFollowing }) => {
  return (
    <FollowWrapper justifyContent="center" >
      <FollowItem column alignItems='center' >
        <Text bold >{`${countFollower}`}</Text>
        <Text bold size="sm" >팔로워</Text>
      </FollowItem> 
      <FollowItem column alignItems='center'>
        <Text bold>{`${countFollowing}`}</Text>
        <Text bold size="sm">팔로잉</Text>
      </FollowItem>
    </FollowWrapper>
  );
};

FollowContainer.propTypes = {
  countFollower: PropTypes.number,
  countFollowing: PropTypes.number
};

export default FollowContainer;
