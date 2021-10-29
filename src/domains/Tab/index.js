import React, { useState } from 'react';
import TabItem from './TabItem';

const Tab = ({ children, activeIndex, ...props }) => {
  const [currIndex, setCurrIndex] = useState(() => {
    if (activeIndex) {
      return activeIndex;
    } else {
      return React.Children.toArray(children).findIndex(element => (
        React.isValidElement(element) 
        && ['Tab.Item', 'Tab.Header', 'Tab.Panel'].includes(element.props.__Type)
      ));
    }
  });

};

Tab.Item = TabItem;

export default Tab;
