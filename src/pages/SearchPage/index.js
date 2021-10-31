import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import useQuery from '@hooks/useQuery';


const ZZAL_ITEM_LOAD_COUNT = 6;

const SearchPage = () => {
  const history = useHistory();
  const keyword = useQuery().get('keyword') || '';
  const [zzalList, fetchList] = useAxios();
  
  useEffect(() => {
    fetchList({
      url: `/search/all/${keyword}`
    });
  }, [keyword]);

  console.log(zzalList);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search?keyword=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar initialKeyword={keyword} onToSubmitPage={handleToSearchPage} />
      <ZzalList zzalList={zzalList} loadCount={ZZAL_ITEM_LOAD_COUNT} />
    </>
  );
};

export default SearchPage;
