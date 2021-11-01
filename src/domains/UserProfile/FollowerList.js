import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Avatar from '@components/Avatar';
import Text from '@base/Text';

const FollowItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding : .25rem 1rem .25rem 3rem;
  width: 250px;
`;

const FollowerList = ({ followers }) => {
  
  return (
    <ul>  
      {followers.map(({ _id, follower: { fullName, image, _id: userId }}) => (
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

FollowerList.propTypes = {
  followers: PropTypes.array, 
  followState: PropTypes.bool,
  myUserImage: PropTypes.string, 
  myUserName: PropTypes.string
};

export default FollowerList;
