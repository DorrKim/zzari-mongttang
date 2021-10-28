import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import styled from '@emotion/styled';

import Input from '@base/Input';

const SearchBar = () => {
  const { keyword } = useParams();

  const handleSubmitSearch = useCallback(e => {
    e.preventDefault();
    
  }, []);

  return (
    <SearchForm onKeyPress={handleSubmitSearch}>
      <Input 
        display='block' 
        height='50px'
        fontSize='20px'
        placeholder='검색어를 입력하세요'
        onChange
        value={keyword} style={{ width: '100%' }}/>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  width: 80%;
  margin: 0 auto;
`;


export default SearchBar;
