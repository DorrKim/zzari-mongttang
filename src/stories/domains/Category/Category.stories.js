import React from 'react';
import CategoryList from '@domains/Category/CategoryList';
import CategoryChip from '@domains/Category/CategoryChip';

export default {
  title: 'Domains/Category'
};

export const Default = args => (
  <CategoryList onChange={e => console.log(e)} {...args} >
    <CategoryChip id={1} name='홍중' />
    <CategoryChip id={2} name='가영' />
    <CategoryChip id={3} name='무호' />
    <CategoryChip id={4} name='현석' />
    <CategoryChip id={5} name='승록' />
    <CategoryChip id={6} name='다슬' />
    <CategoryChip id={7} name='승희' />
  </CategoryList>
);
