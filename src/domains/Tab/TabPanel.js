import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TabPanelWrapper = styled.div`
`;

const TabPanel = ({ children, currIndex }) => {
  const { [currIndex]: contents } = React.Children.toArray(children);
  
  return (
    <TabPanelWrapper>
      {contents}
    </TabPanelWrapper>
  );
};

TabPanel.defaultProps = {
  __TYPE: 'Tab.Panel'
};

TabPanel.propTypes = {
  children: PropTypes.node,
  currIndex: PropTypes.number
};
export default TabPanel;
