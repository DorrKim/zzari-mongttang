import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

<<<<<<< HEAD
import Flex from '@base/Flex';
import colors from '@constants/colors';

const StyledTabItem = styled(Flex)`
  color: ${({ active }) => active ? `${colors.ACCENT}` : `${colors.TEXT_SUBTLE}`};
  border-bottom: ${({ active }) => active ? `2px solid ${colors.ACCENT}` : `.5px solid ${colors.TEXT_SUBTLE}`};
  flex: 1 1 0%;
`;

const TabItem = ({ children, active, ...props }) => {

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
=======
import colors from '@constants/colors';


const TabItemWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border-bottom: ${({ active }) => active ? `3px solid ${colors.BORDER_NORMAL}` : `.5px solid ${colors.BORDER_SUBTLE}`};
  color: ${({ active }) => active ? `${colors.TEXT_NORMAL}` : `${colors.TEXT_SUBTLE}`};
`;

const TabItem = ({ 
  children,
  active, 
  index,
  ...props }) => {
  return (
    <TabItemWrapper active ={active} index={index} {...props}>
      {children}
    </TabItemWrapper>
  );
};

TabItem.defaultProps = {
  __TYPE: 'Tab.Item'
};

TabItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  index: PropTypes.number

>>>>>>> b75b651e69af3ed3bcc7611f582ada24f57f92b2
};

export default TabItem;
