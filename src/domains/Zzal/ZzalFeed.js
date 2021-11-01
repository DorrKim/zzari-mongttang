import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
//import styled from '@emotion/styled';

import ZzalList from './ZzalList';
import Tab from '@domains/Tab';
import Text from '@base/Text';
import useAxios from '@hooks/useAxios';


// const StyledTab = styled(Tab)`
//   @media(max-width: 1176px) {
//     width: 830px;
//   }
//   @media(max-width: 768px) {
//     width: 720px;
//   }
//   @media(max-width: 680px) {
//     width: 480px;
//   }
//   @media(max-width: 375px) {
//     width: 300px;
//   }
// `;


const ZzalFeed = ({ userId, likeZzals }) => {
  const [userPostData, fetchUserPostData] = useAxios(`/posts/author/${userId}`);
  const likeZzalPosts = likeZzals.map(zzal => zzal.post);
  const likeZzalPostState = {
    isLoading: false,
    value: likeZzalPosts
  };

  useEffect(() => {
    fetchUserPostData();
  }, []);

  const { isLoading, value, error } = userPostData; 

  return (
    <>
      <Tab>
        <Tab.Header>
          <Tab.Item index={0}><Text bold>좋아요</Text></Tab.Item>  
          <Tab.Item index={1}><Text bold>업로드</Text></Tab.Item>
        </Tab.Header>
        <Tab.Panel>
          <ZzalList index={0} zzalList={likeZzalPostState} ></ZzalList>
          <div index={1}>
            {isLoading && <div>Loading...</div>}
            {!isLoading && error && <div>Loading...</div>}
            {!isLoading && !error && !value && <div>Loading...</div>}
            <ZzalList zzalList={userPostData} ></ZzalList>
          </div>
        </Tab.Panel>
      </Tab>
      
    </>
  );
};

ZzalFeed.propTypes = {
  userId: PropTypes.string.isRequired,
  likeZzals: PropTypes.array.isRequired
};

export default ZzalFeed;
