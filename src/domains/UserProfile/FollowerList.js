import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from '@components/Avatar';
import Text from '@base/Text';
import Image from '@base/Image';
import followPlaceHolder from '@assets/follow-place-holder.gif';
import colors from '@constants/colors';

import { useHistory } from 'react-router';

const FollowItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding : .25rem 1rem .25rem 3rem;
  width: 250px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 1rem;
`;

const FollowerList = ({ followers }) => {
  const history = useHistory();

  const handleClickFollowItem = useCallback((_, followerId) => {
    history.push(`/user/${followerId}`);
  }, [history]);

  if (followers.length === 0) {
    return ( 
      <ImageWrapper>
        <Text bold color={colors.TEXT_SUBTLE}>팔로워가 없습니다.</Text>
        <Image width='250px' height="250px" src={followPlaceHolder} ></Image>
      </ImageWrapper>
    );
  }

  return (
    <ul>  
      {followers.map(({ _id, follower: { fullName, image, _id: userId }}) => (
        <li key={_id} onClick={e => handleClickFollowItem(e, userId)}>
          <FollowItemWrapper userId={userId}> 
            <Avatar src={image} size='40px' style={{ margin: '.5rem 1rem .5rem 0rem' }} ></Avatar>
            <Text bold>{fullName}</Text>
          </FollowItemWrapper>
        </li>  
      ))}
    </ul>
  );
};

FollowerList.propTypes = {
  followers: PropTypes.array, 
  followState: PropTypes.bool,
  myUserImage: PropTypes.string, 
  myUserName: PropTypes.string
};

export default FollowerList;
