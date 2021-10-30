import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

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

};

export default TabItem;
