import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
 * 1. col, row,  gap, align, justify
 * 2. 반응형
 */
const GridBox = styled.div(({
  gridTemplate = []
}) => {
  const breakpoints = gridTemplate.map(({ bp, row = 1, col = 1, gap }) => (
    {
      [`@media (min-width: ${bp}px)`]: {
        display: 'flex',
        gridTemplateRow: `repeat(${row}, 1fr)`,            
        gridTemplateColumn: `repeat(${col}, 1fr)`,
        gap     
      }
    }
  ));
  console.log(breakpoints);
  
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
  row: PropTypes.number,
  coll: PropTypes.number
};

Grid.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object
};

export default Grid;
