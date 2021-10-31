import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import Grid from '@base/Grid';

let observer = null;
const LOAD_POST_EVENT_TYPE = 'fetch';

const checkIntersect = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_POST_EVENT_TYPE));
    } 
  });
};

const ZzalList = ({ zzalList }) => {
  const [itemCount, setItemCount] = useState(6);
  const [isFetchable, setIsFetchable] = useState(false);
  const init = useRef(false);
  const ref = useRef(null);
  const fetchItem = () => setItemCount(prev => prev + 6);

  const handleLoadPost = useCallback(() => {
    fetchItem();
    observer.observe(ref.current);
  }, [zzalList, observer]);

  useEffect(() => console.log(zzalList.value), []);

  useEffect(() => {
    const { isLoading, value } = zzalList; 

    setIsFetchable(ref.current && !isLoading && value && itemCount < value.length);

    value?.length < itemCount && ref.current?.removeEventListener(LOAD_POST_EVENT_TYPE, handleLoadPost);
  }, [zzalList, ref, itemCount]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener(LOAD_POST_EVENT_TYPE, handleLoadPost);

    return () => {
      ref.current?.removeEventListener(LOAD_POST_EVENT_TYPE, handleLoadPost);
    };
  }, [ref, handleLoadPost]);

  useEffect(() => {      
    if (!observer) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0.5 });
    }
    
    if (!init.current) {
      init.current = true;
      
      return;
    }
    
    if (isFetchable) {
      observer.observe(ref.current);
    }
  }, [observer, isFetchable]);
  
  return (
    <StyledList>
      <Grid gridProps={gridProps}>
        {(zzalList.value || [])
          .filter((_, idx) => idx < itemCount)
          .map(({ _id, image, likes, author }) => (
            <ZzalItem 
              key={_id} 
              id={_id} 
              imageUrl={image} 
              height='100%' 
              number={likes.length}
              authorId={author._id}
            />
          ))
        }  
        <div ref={ref}></div>
      </Grid>
    </StyledList>
  );
};

const gridProps = {
  xs: {
    gap: 8,
    position: ['center', 'center']
  },
  sm: {
    gap: 8,
    position: ['center', 'center']
  },
  md: {
    gap: 8,
    position: ['center', 'center']
  },
  lg: {
    gap: 8,
    position: ['center', 'center']
  },
  xl: {
    gap: 8,
    position: ['center', 'center']
  }
};

const StyledList = styled.div`
  width: 994px;
  margin: 100px auto;
  box-sizing: border-box;
  @media(max-width: 1176px) {
    width: 746px;
  }
  @media(max-width: 768px) {
    width: 490px;
  }
`;

ZzalList.propTypes = {
  zzalList: PropTypes.object
};

export default ZzalList;
