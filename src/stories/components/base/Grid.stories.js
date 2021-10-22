import React from 'react';
import Grid from '@/components/base/Grid';
import styled from '@emotion/styled';

export default {
  title: 'Component/base/Grid',
  component: Grid
};

const Item = styled.div`
  border: 4px solid;
  height: 100px;
  background-color: red;
`;

export const Default = () => {
  const gridProps = [
    {
      bp: 0,
      row: 0,
      col: 12,
      gap: 10
    },
    {
      bp: 720,
      row: 3,
      col: 3,
      gap: 15
    },
    {
      bp: 1080,
      row: 4,
      col: 4,
      gap: 20
    }
  ];
  
  return (
    <Grid gridProps={gridProps}>
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
    </Grid>
  );
};
