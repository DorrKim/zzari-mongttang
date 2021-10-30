import React, { useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Flex from '@base/Flex';
import useAxios from '@hooks/useAxios';
import CategoryChip from './CategoryChip';
import CategoryList from './CategoryList';


const MainCategory = ({ channelId, onClickChip }) => {
  const [categoryList, fetchList] = useAxios('/channels');
  const { isLoading, value } = categoryList;

  useEffect(() => {
    fetchList();
  }, []);

  const selectedChip = useMemo(() => value 
    && Object.values(categoryList.value)
      .findIndex(({ _id }) => _id === channelId), [value, channelId]
  );

  const handleClickChip = useCallback(e => {
    onClickChip(e.id);
  }, [onClickChip]);

  return (
    <>
      <button>Prev</button>
      <Flex>
        <CategoryList selectedIndex={selectedChip} onChange={handleClickChip}>
          {!isLoading && (value?.map(({ _id, name }) => (
            <CategoryChip key={_id} name={name} id={_id} />
          ))
          )}
        </CategoryList>
      </Flex>
      <button>Next</button>
    </>
  );
};

MainCategory.propTypes = {
  channelId: PropTypes.string,
  onClickChip: PropTypes.func
};

export default MainCategory;
