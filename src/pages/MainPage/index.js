import React from 'react';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search/SearchBar';

const MainPage = () => {
  
  return (
    <>
      <h1> 메인 페이지 </h1>
      <SearchBar></SearchBar>
      <ZzalList></ZzalList>
    </>
  );
};


export default MainPage;
