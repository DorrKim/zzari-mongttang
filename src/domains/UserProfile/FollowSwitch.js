import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import colors from '@constants/colors';
import Button from '@base/Button';
import Text from '@base/Text';
import useToggle from '@hooks/useToggle';

const FollowSwitch = () => {
  const [state, handleToggle] = useToggle(false);
  const handleClick = useCallback(() => {

    handleToggle();
  }, []);

  return (
    <Button 
      backgroundColor={state ? colors.ACCENT : colors.PRIMARY} 
      width='80%' 
      height={32} 
      borderRadius='.25rem' 
      borderWidth={0} 
      style={{ padding: 0 }}
      onClick={handleClick}>
      <Text bold color="white"> {state ? '팔로우' : '언팔로우'}</Text>
    </Button>
  );
};

FollowSwitch.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default FollowSwitch;
