import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import useQuery from '@hooks/useQuery';


const SearchPage = () => {
  const keyword = useQuery().get('keyword') || '';
  
  const history = useHistory();
  const [zzalList, fetchList] = useAxios();
  
  useEffect(() => {
    fetchList({
      url: `/search/all/${keyword}`
    });
  }, [keyword]);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search?keyword=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar initialKeyword={keyword} onToSubmitPage={handleToSearchPage} />
      <ZzalList zzalList={zzalList} />
    </>
  );
};


export default SearchPage;
