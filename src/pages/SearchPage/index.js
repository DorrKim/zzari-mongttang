import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';


const SearchPage = () => {
  const { keyword } = useParams();
  console.log(keyword);
  
  const history = useHistory();
  const [zzalList, fetchList] = useAxios();
  
  useEffect(() => {
    fetchList({
      url: `/search/all/${keyword}`
    });
  }, [keyword]);

  const handleToSearchPage = useCallback(value => {
    // window.location.replace(`/search=${value}`);
    value && history.push(`/search=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar onToSubmitPage={handleToSearchPage} />
      <ZzalList zzalList={zzalList} />
    </>
  );
};


export default SearchPage;
