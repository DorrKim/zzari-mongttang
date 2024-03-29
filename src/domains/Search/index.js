import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import Input from '@base/Input';


const SearchBar = ({ initialKeyword = '', onToSubmitPage }) => {
  const [search, setSearch] = useState(initialKeyword);

  const handleKeywordChange = useCallback(value => {
    setSearch(value);
  }, []);

  const handleToSubmitPage = useCallback(e => {
    e.preventDefault();
    
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
          placeholder='검색어를 입력해주세요.'
          style={{ width: '100%',
            border: 'none',
            borderRadius: '20px',
            paddingLeft: '20px',
            boxShadow: '3px 3px 8px #e0e0e0' }}
          value={search || ''}
          onChange={handleKeywordChange}/>
      </form>
    </SearchForm>
  );
};

const SearchForm = styled.div`
  width: 600px;
  margin: 10px auto;
  @media(max-width: 630px) {
    width: 90vw;
  }
`;

SearchBar.propTypes = {
  initialKeyword: PropTypes.string,
  onToSubmitPage: PropTypes.func
};

export default SearchBar;
