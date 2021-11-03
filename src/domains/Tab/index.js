import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import TabHeader from './TabHeader';
import TabItem from './TabItem';
import TabPanel from './TabPanel';
import { useHistory } from 'react-router';

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
`;

const Tab = ({ children, activeIndex = 0, onClickTabItem, ...props }) => {
  const [currIndex, setCurrIndex] = useState(activeIndex);
  const history = useHistory();
  const handleClickTabItem = useCallback(value => {
    setCurrIndex(value);
    onClickTabItem && onClickTabItem(value);
    
  }, [history]);

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
        handleClickTabItem
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
  activeIndex: PropTypes.number,
  onClickTabItem: PropTypes.func
};

Tab.Item = TabItem;
Tab.Header = TabHeader;
Tab.Panel = TabPanel;
export default Tab;
