import React from 'react';
import Flex from '@base/Flex';
import styled from '@emotion/styled';


export default {
  title: 'Component/base/Flex',
  component: Flex,
  argTypes: {
    column: {
      control: 'boolean'
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around']
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around']
    },
    alignContent: {
      control: 'select',
      options: ['stretch', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around']
    },
    flexWrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'wrap-reverse']
    },
    style: {
      control: 'object'
    },
    props: {
      control: 'object'
    }
  }
};

const Item = styled.div`
  width: 500px;
  height: 100px;
  background-color: orange;
  border: 4px solid;
  margin: 8px;
`;

export const Default = args => (
  <Flex {...args}> 
    <Item>Item1</Item>
    <Item>Item2</Item>
    <Item>Item3</Item>
    <Item>Item4</Item>
    <Item>Item5</Item>
  </Flex>
);

