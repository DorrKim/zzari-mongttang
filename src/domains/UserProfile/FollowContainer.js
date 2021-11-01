import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import Text from '@base/Text';
import styled from '@emotion/styled';
import FollowModal from './FollowModal';

const FollowWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: .5rem;
`; 

const FollowItem = styled(Flex)`
  margin-right: 1rem;
  cursor: pointer;
`;
const FollowContainer = ({
  followers,
  following,
  followState, 
  myUserImage, 
  myUserName,
  countFollower, 
  countFollowing
}) => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickFollower = useCallback(() => {
    setVisible(true);
    setActiveIndex(0);
  }, []);

  const handleClickFollowing = useCallback(() => {
    setVisible(true);
    setActiveIndex(1);
  }, []);

  return (
    <>
      <FollowWrapper>
        <FollowItem alignItems='center' index={0} onClick={handleClickFollower}>
          <Text bold style={{ marginRight: '.25rem' }}>{`${countFollower}`}</Text>
          <Text>팔로워</Text>
        </FollowItem> 
        <FollowItem alignItems='center' index={1} onClick={handleClickFollowing}>
          <Text bold style={{ marginRight: '.25rem' }}>{`${countFollowing}`}</Text>
          <Text>팔로잉</Text>
        </FollowItem>
      </FollowWrapper>
      <FollowModal
        visible={visible} 
        followers={followers}
        following={following}
        followState={followState}
        myUserImage={myUserImage}
        myUserName={myUserName}
        activeIndex={activeIndex}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

FollowContainer.propTypes = {
  followers: PropTypes.array,
  following: PropTypes.array,
  followState: PropTypes.bool,
  myUserImage: PropTypes.string,
  myUserName: PropTypes.string,
  countFollower: PropTypes.number,
  countFollowing: PropTypes.number
};

export default FollowContainer;
