import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useInfinteScroll from '@hooks/useInfinteScroll';
import Spinner from '@base/Spinner';


const ZzalList = ({ zzalList = {}, noFavorite, loadCount = 6, ...props }) => {
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const { isLoading, value, error } = zzalList;

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (itemCount < value?.length && isIntersecting) {
        setItemCount(prevCount => prevCount + loadCount);
      }
    },
    threshold: 0.5
  });

  if (error) {
    return <div>error page...</div>;
  }

  return (
    <StyledList {...props}>
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
  gap: 8px;
  font-family: 'netmarbleM';
  width: 100%;
`;

ZzalList.propTypes = {
  zzalList: PropTypes.object,
  noFavorite: PropTypes.bool,
  loadCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default ZzalList;
