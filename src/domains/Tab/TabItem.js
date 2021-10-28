import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Flex from '@base/Flex';
import colors from '@constants/colors';

const StyledTabItem = styled(Flex)`
  color: ${({ active }) => active ? `${colors.ACCENT}` : `${colors.TEXT_SUBTLE}`};
  border-bottom: ${({ active }) => active ? `2px solid ${colors.ACCENT}` : `.5px solid ${colors.TEXT_SUBTLE}`};
  flex: 1 1 0%;
`;

const TabItem = ({ children, active, ...props }) => {
  console.log(active);
  
  return (
    <StyledTabItem 
      justifyContent='center' 
      alignItems='center' 
      active={active} 
      {...props}>
      {children}
    </StyledTabItem>
  );
};

TabItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool
};

export default TabItem;
