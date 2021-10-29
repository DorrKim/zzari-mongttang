import styled from '@emotion/styled';
import React, { useState } from 'react';
import TabHeader from './TabHeader';
import TabItem from './TabItem';
import PropTypes from 'prop-types';

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  border: 2px solid;
`;

const Tab = ({ children, activeIndex = 0, ...props }) => {
  const [currIndex, setCurrIndex] = useState(activeIndex);
  const tabHeader = React.Children
    .toArray(children)
    .filter(element => {
      return (
        React.isValidElement(element) 
      && element.props.__TYPE === 'Tab.Header'   
      );
    })
    .map(element => {
      return React.cloneElement(element, {
        ...element.props,
        currIndex,
        handleClickTabItem: setCurrIndex
      });
    });
      
  return (
    <TabWrapper {...props}>
      {tabHeader}
    </TabWrapper>
  ); 
};

Tab.propTypes = {
  children: PropTypes.node,
  activeIndex: PropTypes.number
};

Tab.Item = TabItem;
Tab.Header = TabHeader;
export default Tab;
