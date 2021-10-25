import React from 'react';

import colors from '@/utils/constants/colors';
import Button from '@/components/base/Button';
import Text from '@/components/base/Text';
import useToggle from '@/hooks/useToggle';

const FollowSwitch = () => {
  const [state, handleToggle] = useToggle(false);
  
  return (
    <Button 
      backgroundColor={state ? colors.ACCENT : colors.PRIMARY} 
      width='80%' 
      height={32} 
      borderRadius='.25rem' 
      borderWidth={0} 
      style={{ padding: 0 }}
      onClick={handleToggle}>
      <Text bold color="white"> {state ? '팔로우' : '언팔로우'}</Text>
    </Button>
  );
};

export default FollowSwitch;
