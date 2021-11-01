import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import colors from '@constants/colors';
import Button from '@base/Button';
import Text from '@base/Text';
import { useHistory } from 'react-router';


const StyledFollowButton = styled(Button)`
  @media(min-width: 680px) {
    width: 20rem;
    height: 2.5rem;
}
  
`;

const FollowToggle = ({ 
  isMyProfile, 
  handleClickFollow, 
  handleClickUnFollow, 
  followState }) => {
  const history = useHistory();
  
  const onToEditProfilePage = useCallback(() => {
    history.push('/editProfile');
  });

  const handleToggleFollow = useCallback(() => {
    if (followState) {
      handleClickUnFollow && handleClickUnFollow();
    } else {
      handleClickFollow && handleClickFollow();
    }

  }, [followState, handleClickUnFollow, handleClickFollow]);
  
  return (
    <StyledFollowButton 
      backgroundColor={
        isMyProfile || followState 
          ? 'white' 
          : colors.ACCENT} 
      width='9rem' 
      height={32} 
      borderRadius='.375rem' 
      borderWidth={0}
      onClick={isMyProfile 
        ? onToEditProfilePage 
        : handleToggleFollow}
      style={{ outline: isMyProfile || followState ? '1.25px solid lightgray' : 0 }}  
    >
      <Text 
        bold 
        color={isMyProfile || followState 
          ? 'black' 
          : 'white'}> 
        {isMyProfile 
          ? '내 정보 수정' 
          : followState ? '팔로잉' : '팔로우'}</Text>
    </StyledFollowButton>
  );
};

FollowToggle.propTypes = {
  handleClickFollow: PropTypes.func,
  handleClickUnFollow: PropTypes.func,
  isMyProfile: PropTypes.bool,
  followState: PropTypes.bool
};

export default FollowToggle;
