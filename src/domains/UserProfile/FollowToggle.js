import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import colors from '@constants/colors';
import Button from '@base/Button';
import Text from '@base/Text';
import useToggle from '@hooks/useToggle';


const FollowToggle = ({ isMyProfile }) => {
  const [state, handleToggle] = useToggle(false);
  const handleClick = useCallback(() => {
    handleToggle();
  }, []);


  return (
    <Button 
      backgroundColor={isMyProfile 
        ? colors.BORDER_SUBTLE 
        : state ? colors.ACCENT : colors.PRIMARY} 
      width='80%' 
      height={32} 
      borderRadius='.25rem' 
      borderWidth={0} 
      style={{ padding: 0 }}
      onClick={isMyProfile ? null : handleClick}>
      <Text bold color="white"> 
        {isMyProfile 
          ? '내 정보 수정' 
          : state ? '팔로우' : '언팔로우'}</Text>
    </Button>
  );
};

FollowToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMyProfile: PropTypes.bool
};

export default FollowToggle;
