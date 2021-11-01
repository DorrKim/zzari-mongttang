import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import Text from '@base/Text';
import styled from '@emotion/styled';
import FollowModal from './FollowModal';

const FollowWrapper = styled(Flex)`
  width: 100%;
  margin-bottom: 8px;
`; 

const FollowItem = styled(Flex)`
  margin: 0 12px;
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

  return (
    <>
      <FollowWrapper justifyContent="center" >
        <FollowItem column alignItems='center' onClick={() => setVisible(true)}>
          <Text bold >{`${countFollower}`}</Text>
          <Text bold size="sm" >팔로워</Text>
        </FollowItem> 
        <FollowItem column alignItems='center' onClick={() => setVisible(true)}>
          <Text bold>{`${countFollowing}`}</Text>
          <Text bold size="sm">팔로잉</Text>
        </FollowItem>
      </FollowWrapper>
      <FollowModal
        visible={visible} 
        followers={followers}
        following={following}
        followState={followState}
        myUserImage={myUserImage}
        myUserName={myUserName}
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
