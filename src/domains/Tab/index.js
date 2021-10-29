import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
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

export default Tab;
