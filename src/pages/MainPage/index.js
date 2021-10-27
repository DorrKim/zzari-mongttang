import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@/domains/Zzal/ZzalList';
import SearchBar from '@/domains/Search';


const MainPage = () => {
  const history = useHistory();

  const handleToSearchPage = useCallback(value => {
    console.error(value);
    value && history.push(`/search/${value}`);
  }, []);
  
  return (
    <>
      <SearchBar onToSubmitPage={handleToSearchPage}></SearchBar>
      <ZzalList></ZzalList>
    </>
  );
};

export default MainPage;
