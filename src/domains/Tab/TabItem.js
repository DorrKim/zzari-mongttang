import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TabItemWrapper = styled.div`
  display: inline-flex;
  justify-Content: center;
  align-items: center;
  width: 150px;
  height: 60px;
  border: 2px solid;
  color: ${({ active }) => active ? 'red' : 'blue'}
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
