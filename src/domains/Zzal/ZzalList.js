import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useInfinteScroll from '@hooks/useInfinteScroll';


const ZzalList = ({ zzalList, loadCount, ...props }) => {
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(loadCount);
  const { isLoading, value, error } = zzalList;

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (itemCount < value?.length && isIntersecting) {
        console.log('loading');
        setItemCount(prevCount => prevCount + loadCount);
      }
    },
    threshold: 0.5
  });

  if (isLoading) {
    return <div>loading page...</div>;
  }

  if (error) {
    return <div>error page...</div>;
  }

  return (

    <StyledList {...props}>
      {(zzalList.value || [])
        .filter((_, idx) => idx < itemCount)
        .map(item => (
          <ZzalItem 
            key={item._id} 
            imageUrl={item.image} 
            height='100%' 
            postId={item._id} 
            likes={item.likes}
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
  margin: 100px auto;
  width: 994px;
  gap: 8px;
  @media(max-width: 1176px) {
    width: 746px;
  }
  @media(max-width: 768px) {
    width: 648px;
  }
  @media(max-width: 680px) {
    width: 368px;
  }
  @media(max-width: 375px) {
    width: 268px;
  }
`;

ZzalList.propTypes = {
  zzalList: PropTypes.object,
  loadCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default ZzalList;
