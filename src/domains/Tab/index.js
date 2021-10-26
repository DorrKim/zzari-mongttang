import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Flex from '@/components/base/Flex';
import colors from '@/utils/constants/colors';

const TabWrapper = styled(Flex)`
  height: 50px;  
  width: 300px;
`;

const StyledTabItem = styled(Flex)`
  color: ${colors.TEXT_SUBTLE};
  border-bottom: 1px solid ${colors.BORDER_SUBTLE};
  flex: 1 1 0%;

  &.active {
    color: ${colors.ACCENT}
  }
`;

const TabItem = ({ children }) => {
  return (
    <StyledTabItem className="active" justifyContent='center' alignItems='center'>{children}</StyledTabItem>
  );
};

const Tab = ({ children }) => {
  return (
    <TabWrapper alignItems='stretch' justifyContent='stretch'>
      {children.map((child, index) => <TabItem key={index}>{child}</TabItem>)}
    </TabWrapper>
  );
};

TabItem.propTypes = {
  children: PropTypes.node
};

Tab.propTypes = {
  children: PropTypes.node
};

export default Tab;
