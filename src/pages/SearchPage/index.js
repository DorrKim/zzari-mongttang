import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import SearchList from '@domains/Search/SearchList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import useQuery from '@hooks/useQuery';
import { filterSpecialSymbols } from '@library/filter';
import nothing_img from '@assets/nothing.gif';
import Image from '@base/Image';


const ITEM_LOAD_COUNT = 6;

const SearchPage = () => {
  const history = useHistory();
  const keyword = useQuery().get('keyword');
  const [searchResponse, fetchSearchResponse] = useAxios();

  useEffect(() => {
    keyword && filterSpecialSymbols(keyword) && fetchSearchResponse({
      url: `/search/all/${keyword}`
    });
  }, [keyword]);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search?keyword=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar initialKeyword={keyword} onToSubmitPage={handleToSearchPage} />
      {filterSpecialSymbols(keyword) && searchResponse.value?.length
        ? (<SearchList style={{ marginTop: '50px' }} searchResponse={searchResponse} loadCount={ITEM_LOAD_COUNT} />)
        : <div style={{ textAlign: 'center' }}><Image width='300px' height='300px' src={nothing_img}/></div>
      }
    </>
  );
};

export default SearchPage;
