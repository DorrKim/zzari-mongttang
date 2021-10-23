import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const breakpoints = {
  xs: 300,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

const GridBox = styled.div(({
  gridProps
}) => {
  const mediaQuery = Object
    .entries(breakpoints)
    .reduce((acc, [key, value]) => {
      acc[key] = `@media (min-width: ${value}px)`;
    
      return acc;
    }, {});

  const styleObj = Object
    .entries(gridProps)
    .reduce((acc, [key, { row, col, gap }]) => {
      const { [key]: newKey } = mediaQuery;
  
      acc[newKey] = {
        gridTemplateRows: `repeat(${row}, 1fr)`,
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: `${gap}px`
      };
    
      return acc;
    }, { display: 'grid' });
  
  return styleObj;
});

const Grid = ({ children, ...props }) => {
  return (
    <GridBox {...props}>
      {children}
    </GridBox>
  );
};

GridBox.propTypes = {
  gridProps: PropTypes.object
};

Grid.propTypes = {
  children: PropTypes.node,
  props: PropTypes.object
};

export default Grid;
