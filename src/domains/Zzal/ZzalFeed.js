import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ZzalList from './ZzalList';
import Tab from '@domains/Tab';
import Text from '@base/Text';
import useAxios from '@hooks/useAxios';


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

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  
  if (error) {
    return <div>에러발생</div>;
  }
  if (!value) {
    return <button onClick={fetchUserPostData}>불러오기</button>;
  }

  return (
    <>
      <Tab>
        <Tab.Header>
          <Tab.Item index={0}><Text bold>좋아요</Text></Tab.Item>  
          <Tab.Item index={1}><Text bold>업로드</Text></Tab.Item>
        </Tab.Header>
        <Tab.Panel>
          <ZzalList index={0} zzalList={likeZzalPostState} ></ZzalList>
          <ZzalList index={1} zzalList={userPostData} ></ZzalList>
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
