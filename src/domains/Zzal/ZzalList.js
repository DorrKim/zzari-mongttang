import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useAsync from '@hooks/useAsync';
import styled from '@emotion/styled';
import Image from '@base/Image';

const ZzalList = () => {
  const [itemCount, setItemCount] = useState(0);
  const [ref, setRef] = useState(null);

  const initialPosts = useAsync(async () => {
    console.log('apitest.......');
    
    return await axios  
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(res => res.data);
  }, []);


  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, { threshold: 1 });
      observer.observe(ref);
    }
    
    return () => observer && observer.disconnect();
  }, [ref]);

  const fetchItems = async () => setItemCount(prev => prev + 9);

  const checkIntersect = async ([entry], observer) => {
    if (!entry.isIntersecting) {
      return;
    }
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  };

  console.log(itemCount);

  return (
    <StyledList>
      {(initialPosts.value || []).filter((_, idx) => idx < itemCount).map(post => (
        <Image key={post.id} src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3867a8b5-610b-420e-b1a1-0e7c8b19a2dd/20211019_616ed2e7aaef5.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211022%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211022T182252Z&X-Amz-Expires=86400&X-Amz-Signature=c07bb148d5c657fbced09ebef126e34d1c19f713381fe609d38566fc20fb772c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220211019_616ed2e7aaef5.gif%22' type='circle'/>
      ))}
      <div ref={setRef} />
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 400px);
`;

export default ZzalList;
