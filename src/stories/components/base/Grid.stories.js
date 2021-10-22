import React from 'react';
import Grid from '@/components/base/Grid';
import styled from '@emotion/styled';

export default {
  title: 'Component/base/Grid',
  component: Grid,
  argTypes: {
    
  }
};

const Item = styled.div`
  border: 4px solid;
  background-color: red;
`;

export const Default = args => {
  return (
    <Grid {...args} >
      <Item> Item1 </Item>
      <Item> Item2 </Item>
      <Item> Item3 </Item>
      <Item> Item4 </Item>
      <Item> Item5 </Item>
    </Grid>
  );
};
