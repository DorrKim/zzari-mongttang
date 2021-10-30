<<<<<<< HEAD
import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Flex from '@/components/base/Flex';
import TabItem from './TabItem';

const TabWrapper = styled(Flex)`
  position: relative;
  height: 50px;  
  width: 300px;
`;

const Tab = ({ children }) => {
  const [currIdx, setCurrIndex] = useState(0);
 
  return (
    <TabWrapper 
      alignItems='stretch' 
      justifyContent='stretch'>
      {children.map((child, index) => (
        <TabItem 
          key={index} 
          active={currIdx === index} 
          onClick={() => setCurrIndex(index)}>
          {child}
        </TabItem>
      ))}
    </TabWrapper>
  );
};

Tab.propTypes = {
  children: PropTypes.node
};

=======
import styled from '@emotion/styled';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TabHeader from './TabHeader';
import TabItem from './TabItem';
import TabPanel from './TabPanel';

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
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
>>>>>>> b75b651e69af3ed3bcc7611f582ada24f57f92b2
export default Tab;
