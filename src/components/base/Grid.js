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
    .reduce((acc, [key, { gap = 10, position = ['start', 'start'] }]) => {
      const { [key]: newKey } = mediaQuery;
  
      acc[newKey] = {
        gridTemplateRows: 'repeat(auto-fit, minmax(240px, 1fr))',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: `${gap}px`,
        justifyItems: position[0],
        alignItems: position[1],
        gridAutoRows: '240px',
        gridAutoColumns: '240px'
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
