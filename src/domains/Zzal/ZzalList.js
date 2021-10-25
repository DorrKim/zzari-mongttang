import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useAxios from '@hooks/useAxios';
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

const ZzalList = ({ channel = '61755fa5359c4371f68ac695' }) => {
  const [initialPosts, fetchPost] = useAxios(`/posts/channel/${channel}`);
  const [itemCount, setItemCount] = useState(6);
  const [isFetchable, setIsFetchable] = useState(false);
  const init = useRef(false);
  const ref = useRef(null);
  const fetchItem = () => setItemCount(prev => prev + 6);

  useEffect(() => {
    const { isLoading, value } = initialPosts; 
    setIsFetchable(ref.current && !isLoading && value && itemCount < value.length);
  }, [ref, itemCount, initialPosts]);

  useEffect(() => {
    fetchPost();
  }, []);

  const handleLoadPost = useCallback(() => {
    fetchItem();
    observer.observe(ref.current);
  }, [observer]);

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
  }, [initialPosts, observer, isFetchable]);
  
  return (
    <StyledList>
      <Grid gridProps={gridProps}>
        {(initialPosts.value || [])
          .filter((_, idx) => idx < itemCount)
          .map(post => (
            <ZzalItem key={post._id} id={post._id} src={post.image} height='100%'/>
          ))
        }  
        <div ref={ref}></div>
      </Grid>
    </StyledList>
  );
};

const gridProps = {
  xs: {
    row: 2,
    col: 2,
    gap: 5,
    position: ['center', 'center']
  },
  sm: {
    row: 3,
    col: 3,
    gap: 6,
    position: ['center', 'center']
  },
  md: {
    row: 5,
    col: 5,
    gap: 7,
    position: ['center', 'center']
  },
  lg: {
    row: 6,
    col: 6,
    gap: 8,
    position: ['center', 'center']
  },
  xl: {
    row: 7,
    col: 7,
    gap: 10,
    position: ['center', 'center']
  }
};

const StyledList = styled.div`
  width: 100%;
  height: 30vh;
  padding: 10px 20px;  
  box-sizing: border-box;
`;

ZzalList.propTypes = {
  channel: PropTypes.string
};

export default ZzalList;
