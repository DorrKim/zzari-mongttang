import React from 'react';
import { useParams } from 'react-router';


const SearchPage = () => {
  const { keyword } = useParams();
  
  return <h1>짤 검색결과 {keyword}</h1>;
};


export default SearchPage;
