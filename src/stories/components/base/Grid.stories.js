import React from 'react';
import Grid from '@base/Grid';
import styled from '@emotion/styled';

export default {
  title: 'Component/base/Grid',
  component: Grid
};

const Item = styled.div`
  border: 4px solid;
  width: 50px;
  height: 50px;
  background-color: red;
`;

export const Default = () => {
  const gridProps = {
    xs: {
      row: 2,
      col: 2,
      gap: 10,
      position: ['center', 'start']
    },
    sm: {
      row: 3,
      col: 3,
      gap: 15
    },
    md: {
      row: 4,
      col: 4,
      gap: 20
    },
    lg: {
      row: 5,
      col: 5,
      gap: 25
    },
    xl: {
      row: 6,
      col: 6,
      gap: 30
    }
  };

  return (
    <Grid 
      style={
        { 
          width: '100%', 
          height: '100vh' 
        }
      } 
      gridProps={gridProps}>
      <Item> Item1 </Item>
      <Item> Item2 </Item>
      <Item> Item3 </Item>
      <Item> Item4 </Item>
      <Item> Item5 </Item>
      <Item> Item6 </Item>
      <Item> Item7 </Item>
      <Item> Item8 </Item>
      <Item> Item9 </Item>
      <Item> Item10 </Item>
      <Item> Item11 </Item>
      <Item> Item12 </Item>
      <Item> Item13 </Item>
      <Item> Item14 </Item>
      <Item> Item15 </Item>
    </Grid>
  );
};
