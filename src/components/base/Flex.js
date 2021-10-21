import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const FlexBox = styled.div((
  {
    inline, 
    column, 
    justifyContent, 
    alignItems, 
    alignContent, 
    flexWrap 
  }
) => ({
  display: inline ? 'inline-flex' : 'flex',
  flexDirection: column ? 'column' : 'row',
  justifyContent,
  alignItems,
  alignContent,
  flexWrap
}));

const Flex = ({ children, style, ...props }) => (
  <FlexBox style={{ ...style }} {...props} >
    {children}
  </FlexBox>
);

Flex.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

export default Flex;
