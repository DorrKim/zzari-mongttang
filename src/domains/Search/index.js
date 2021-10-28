import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router'; 

import styled from '@emotion/styled';
import Input from '@base/Input';
// import colors from '@constants/colors';


const SearchBar = ({ onToSubmitPage }) => {
  const { keyword } = useParams();
  const [search, setSearch] = useState(keyword);

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
          placeholder='검색어를 입력하세요'
          style={{ width: '100%',
            border: 'none',
            borderRadius: '20px',
            padding: '0 20px',
            boxShadow: '3px 3px 8px #e0e0e0' }}
          // backgroundColor: '#f1f1fe' }}
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
  value: PropTypes.string,
  onToSubmitPage: PropTypes.func
};

export default SearchBar;
