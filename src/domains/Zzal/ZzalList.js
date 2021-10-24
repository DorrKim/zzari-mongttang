import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import Image from '@base/Image';
import useAxios from '@hooks/useAxios';
import Grid from '@base/Grid';

let observer = null;
const LOAD_POST_EVENT_TYPE = 'fetch';

const checkIntersect = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_POST_EVENT_TYPE));
      observer.observe(entry.target);
    } 
  });
};

const ZzalList = ({ channel = '61755fa5359c4371f68ac695' }) => {
  const [initialPosts, fetchPost] = useAxios(`/posts/channel/${channel}`);
  const [itemCount, setItemCount] = useState(6);
  const [isInit, setIsInit] = useState(false);
  const ref = useRef(null);
  const fetchItem = () => setItemCount(prev => prev + 6);
  // const TEST_IMG_URL = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/287d62dc-d081-4e02-949e-cc75fc018279/20160902_57c9307c5a024.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211024%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211024T184206Z&X-Amz-Expires=86400&X-Amz-Signature=0632049d22f4c33b1fad570c85dbe388d95daa7d08652d48d1b0654f9c9fb917&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220160902_57c9307c5a024.gif%22';  
  
  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleLoadPost = useCallback(() => {
      () => fetchItem();
    });

    ref.current.addEventListener(LOAD_POST_EVENT_TYPE, handleLoadPost);

    return () => {
      ref.current.removeEventListener(LOAD_POST_EVENT_TYPE, handleLoadPost);
    };
  }, [ref]);

  useEffect(() => {      
    if (!observer) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0.5 });
    }

    if (!isInit) {
      setIsInit(true);
      
      return;
    }

    if (ref.current && !initialPosts.isLoading) {
      observer.observe(ref.current);
    }
  }, [isInit, initialPosts, observer]);
  
  return (
    <StyledList>
      <Grid gridProps={gridProps}>
        {(initialPosts.value || []).filter((_, idx) => idx < itemCount).map(post => (
          <div id={post._id} key={post._id} style={{ width: '152px',
            height: '152px',
            overflow: 'hidden',
            alignContent: 'center' }}>
            <Image src={post.image} height='100%'/>
          </div>
        )
        )}  
        <div ref={ref}></div>
      </Grid>
    </StyledList>
  );
};

const gridProps = {
  xs: {
    row: 2,
    col: 2,
    gap: 10,
    position: ['center', 'start']
  },
  sm: {
    row: 3,
    col: 3,
    gap: 15
  },
  md: {
    row: 4,
    col: 4,
    gap: 20
  },
  lg: {
    row: 5,
    col: 5,
    gap: 25
  },
  xl: {
    row: 6,
    col: 6,
    gap: 30
  }
};

const StyledList = styled.div`
  width: 100%;
  height: 30vh;
  padding: 10px 20px;  
`;

ZzalList.propTypes = {
  channel: PropTypes.string
};

export default ZzalList;
