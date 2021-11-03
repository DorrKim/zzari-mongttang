import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styled from '@emotion/styled';
import Text from '@base/Text';
import Image from '@base/Image';
import colors from '@constants/colors';
import followPlaceHolder from '@assets/follow-place-holder.gif';

const FollowItemWrapper = styled.div`
  display: flex;
  align-items: center; 
  padding : .25rem 1rem .25rem 3rem;
  width: 250px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 1rem;
`;

const FollowingList = ({ following }) => {
  if (following.length === 0) {
    return ( 
      <ImageWrapper>
        <Text bold color={colors.TEXT_SUBTLE}>팔로우 중인 사람이 없습니다.</Text>
        <Image width='250px' height="250px" src={followPlaceHolder} ></Image>
      </ImageWrapper>
    );
  }

  return (
    <ul>
      {following.map(({ _id, user: { fullName, image, _id: userId }}) => (
        <li key={_id} >
          <FollowItemWrapper userId={userId}> 
            <Avatar src={image} size='40px' style={{ margin: '.5rem 1rem .5rem 0rem' }}></Avatar>
            <Text bold>{fullName}</Text>
          </FollowItemWrapper>
        </li>  
      ))}
    </ul>
  );
};

FollowingList.propTypes = {
  following: PropTypes.array
};

export default FollowingList;
