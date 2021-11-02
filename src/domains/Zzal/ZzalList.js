import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useInfinteScroll from '@hooks/useInfinteScroll';
import Spinner from '@base/Spinner';


const ZzalList = ({ zzalList = {}, noFavorite, loadCount = 6, style, ...props }) => {
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const { isLoading, value, error } = zzalList;
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    error && setIsError(true);
  }, [error]);

  useEffect(() => {
    isError && history.push('/error');
  }, [isError]);


  useInfinteScroll({
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
      {isLoading ? (<Spinner />) : (zzalList.value || [])
        .filter((_, idx) => idx < itemCount)
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
  justify-items: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 984px;
  gap: 8px;
  font-family: 'netmarbleM';
  @media(max-width: 1176px) {
    width: 746px;
  }
  @media(max-width: 768px) {
    width: 648px;
  }
  @media(max-width: 680px) {
    width: 312px;
  }
  @media(max-width: 375px) {
    width: 268px;
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
