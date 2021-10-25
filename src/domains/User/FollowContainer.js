import React from 'react';
import PropTypes from 'prop-types';

import Flex from '@/components/base/Flex';
import Text from '@components/base/Text';


const FollowContainer = ({ followers = [], following = [] }) => {
  return (
    <Flex justifyContent="center" style={{ width: '100%',
      marginBottom: '8px' }}>
      <Flex column alignItems='center' style={{ margin: '0 8px' }}>
        <Text bold >{`${followers.length}`}</Text>
        <Text bold size="sm" >팔로워</Text>
      </Flex> 
      <Flex column alignItems='center' style={{ margin: '0 8px' }}>
        <Text bold>{`${following.length}`}</Text>
        <Text bold size="sm">팔로잉</Text>
      </Flex>
    </Flex>
  );
};

FollowContainer.propTypes = {
  followers: PropTypes.array,
  following: PropTypes.array
};

export default FollowContainer;
