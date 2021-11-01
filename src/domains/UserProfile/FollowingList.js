import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styled from '@emotion/styled';
import Text from '@base/Text';

const FollowItemWrapper = styled.div`
  display: flex;
  align-items: center; 
  padding : .25rem 1rem .25rem 3rem;
  width: 250px;
`;

const FollowingList = ({ following }) => {
  
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
