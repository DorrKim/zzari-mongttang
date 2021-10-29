import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import CategoryChip from './CategoryChip';
import CategoryList from './CategoryList';


const CategoryCarousel = ({ channelId, onClickChip }) => {
  const [categoryList, fetchList] = useAxios('/channels');

  useEffect(() => {
    fetchList();
  }, []);

  const findIinitialChip = categoryList.value && Object.values(categoryList.value).findIndex(chip => chip._id === channelId);

  const handleClickChip = useCallback(e => {
    onClickChip(e.id);
  }, []);

  return (
    <>
      <button>Prev</button>
      <Flex>
        <CategoryList selectedIndex={findIinitialChip} onChange={handleClickChip}>
          {(categoryList.value?.map(category => (
            <CategoryChip key={category._id} name={category.name} id={category._id} />
          ))
          )}
        </CategoryList>
      </Flex>
      <button>Next</button>
    </>
  );
};

CategoryCarousel.propTypes = {
  channelId: PropTypes.string,
  onClickChip: PropTypes.func
};

export default CategoryCarousel;
