import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import Spinner from '@base/Spinner';


const ZzalList = (
  { zzalList = {}, 
    noFavorite, 
    loadCount = 12, 
    style, 
    ...props }
) => {
  const history = useHistory();
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const { isLoading, value, error } = zzalList;
  const [isError, setIsError] = useState(false);
  const [sortedZzalList, setSortedZzalList] = useState([]);

  useEffect(() => {
    value && setSortedZzalList(Object.values(value).sort((a, b) => b['likes'].length - a['likes'].length));
  }, [value]);

  useEffect(() => {
    error && setIsError(true);
  }, [error]);

  useEffect(() => {
    isError && history.push('/error');
  }, [isError]);

  useInfiniteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (itemCount < value?.length && isIntersecting) {
        setItemCount(prevCount => prevCount + loadCount);
      }
    },
    threshold: 0.5
  });

  if (isLoading) {
    return <Spinner style={{ height: '80vh' }} />;
  }

  return (
    <StyledList style={{ ...style }} {...props}>
      {sortedZzalList.filter((value, idx) => 'channel' in value && idx < itemCount)
        .map(item => (
          <ZzalItem 
            key={item._id} 
            imageUrl={item.image} 
            height='100%' 
            postId={item._id} 
            likes={item.likes}
            noFavorite={noFavorite}
          />
        ))
      }  
      <div ref={setTarget}></div>
    </StyledList>
  );
};

const StyledList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 1012px;
  gap: 8px;
  padding: 36px;

  @media(max-width: 1012px) {
    padding: 20px;
    width: 100vw;
  }

  @media(max-width: 590px) {
    padding: 4px;
    gap: 4px;
  }
`;


ZzalList.propTypes = {
  zzalList: PropTypes.object,
  noFavorite: PropTypes.bool,
  loadCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  style: PropTypes.object
};

export default ZzalList;
