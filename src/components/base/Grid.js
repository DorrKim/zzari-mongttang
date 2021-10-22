import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const GridBox = styled.div(({
  gridProps = []
}) => {
  const breakpoints = gridProps.map(({ bp, row, col, gap }) => (
    {
      [`@media (min-width: ${bp}px)`]: {
        display: 'grid',
        gridTemplateRows: `repeat(${row || 1}, 1fr)`,            
        gridTemplateColumns: `repeat(${col || 1}, 1fr)`,
        gap     
      }
    }
  ));
  
  return breakpoints;
});

const Grid = ({ children, ...props }) => {
  return (
    <GridBox {...props}>
      {children}
    </GridBox>
  );
};

GridBox.propTypes = {
  gridTemplate: PropTypes.arrayOf(PropTypes.object)
};

Grid.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object
};

export default Grid;
