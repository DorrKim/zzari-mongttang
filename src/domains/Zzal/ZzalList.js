import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import useAsync from '@hooks/useAsync';
import styled from '@emotion/styled';
import Image from '@base/Image';


let observer = null;
const LOAD_IMG_EVENT_TYPE = 'fetch';

const checkIntersect = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
      observer.observe(entry.target);
    } 
  });
};

const ZzalList = () => {
  const [itemCount, setItemCount] = useState(9);
  const [isInit, setIsInit] = useState(false);
  const ref = useRef(null);
  const fetchItem = () => setItemCount(prev => prev + 9);
  const TEST_IMG_URL = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d373d836-bb5d-4bf6-8f12-baebd8aa3dca/%EC%A0%9C%EB%AA%A9%EC%9D%84_%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-003_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211024%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211024T062214Z&X-Amz-Expires=86400&X-Amz-Signature=ed791d1519057291afbd5941bd826c845dfc979358c99d6a3d3575d0631603c7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25EC%25A0%259C%25EB%25AA%25A9%25EC%259D%2584%2520%25EC%259E%2585%25EB%25A0%25A5%25ED%2595%25B4%25EC%25A3%25BC%25EC%2584%25B8%25EC%259A%2594_-003%2520%281%29.png%22';

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.addEventListener(LOAD_IMG_EVENT_TYPE, () => fetchItem());

    return () => {
      ref.current.removeEventListener(LOAD_IMG_EVENT_TYPE, () => fetchItem());
    };
  }, [ref]);

  const initialPosts = useAsync(async () => {
    return await axios  
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.data);
  }, []);  

  useEffect(() => {      
    if (!observer) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 0 });
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
      {(initialPosts.value || []).filter((_, idx) => idx < itemCount).map(post => (
        <Image key={post.id} src={TEST_IMG_URL} type='circle' height='200px'/>
      )
      )}  
      <div ref={ref}></div>
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
`;

export default ZzalList;
