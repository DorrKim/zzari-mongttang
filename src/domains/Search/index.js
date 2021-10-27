import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router'; 

import styled from '@emotion/styled';
import Input from '@base/Input';


const SearchBar = ({ onToSubmitPage }) => {
  const { keyword } = useParams();
  const [search, setSearch] = useState(keyword);

  const handleKeywordChange = useCallback(value => {
    setSearch(value);
  }, []);

  const handleToSubmitPage = useCallback(e => {
    e.preventDefault();
    
    console.log(search);
    onToSubmitPage && onToSubmitPage(search);
  }, [onToSubmitPage, search]);

  return (
    <SearchForm>
      <form onSubmit={handleToSubmitPage}>
        <Input 
          name='keyword'
          display='block' 
          height='50px'
          fontSize='20px'
          autoComplete='off'
          placeholder='검색어를 입력하세요'
          style={{ width: '100%' }}
          value={search || ''}
          onChange={handleKeywordChange}/>
      </form>
    </SearchForm>
  );
};

const SearchForm = styled.div`
  width: 80vw;
  margin: 0 auto;
`;

SearchBar.propTypes = {
  value: PropTypes.string,
  onToSubmitPage: PropTypes.func
};

export default SearchBar;
