import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const TabHeaderWrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: stretch;
  height: 50px;
`;

const TabHeader = ({ children, handleClickTabItem, currIndex }) => {
  const items = React.Children
    .toArray(children)
    .filter(element => {
      return (
        React.isValidElement(element) 
        && element.props.__TYPE === 'Tab.Item');
    })
    .map(element => {

      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: currIndex === element.props.index, 
        onClick: () => {
          handleClickTabItem(element.props.index);
        } 
      });
    });

  return (
    <TabHeaderWrapper>
      {items}
    </TabHeaderWrapper>
  );
};

TabHeader.defaultProps = {
  __TYPE: 'Tab.Header'
};

TabHeader.propTypes = {
  children: PropTypes.node,
  currIndex: PropTypes.number,
  handleClickTabItem: PropTypes.func
};

export default TabHeader;
