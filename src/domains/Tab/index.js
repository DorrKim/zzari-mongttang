import styled from '@emotion/styled';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TabHeader from './TabHeader';
import TabItem from './TabItem';
import TabPanel from './TabPanel';

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1111px;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  @media(max-width: 1176px) {
    width: 830px;
  }
  @media(max-width: 768px) {
    width: 720px;
  }
  @media(max-width: 680px) {
    width: 350px;
  }
  @media(max-width: 375px) {
    width: 300px;
  }
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

  const tabPanel = React.Children
    .toArray(children)
    .filter(element => {
      return (
        React.isValidElement(element) 
      && element.props.__TYPE === 'Tab.Panel'   
      );
    })
    .map(element => {
      return React.cloneElement(element, {
        ...element.props,
        currIndex
      });
    }); 
  
  return (
    <TabWrapper {...props}>
      {tabHeader}
      {tabPanel}
    </TabWrapper>
  ); 
};

Tab.propTypes = {
  children: PropTypes.node,
  activeIndex: PropTypes.number
};

Tab.Item = TabItem;
Tab.Header = TabHeader;
Tab.Panel = TabPanel;
export default Tab;
