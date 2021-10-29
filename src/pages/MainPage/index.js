import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';


const DEFAULT_CATEGORY = '61755fa5359c4371f68ac695';

const MainPage = () => {
  const history = useHistory();
  const [zzalList, fetchList] = useAxios(`/posts/channel/${DEFAULT_CATEGORY}`);

  useEffect(() => {
    fetchList();
  }, []);

  console.log(zzalList.value);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search/${value}`);
  }, []);
  
  return (
    <>
      <SearchBar onToSubmitPage={handleToSearchPage}></SearchBar>
      <ZzalList zzalList={zzalList} ></ZzalList>
    </>
  );
};

export default MainPage;
