import React from 'react';
import PropTypes from 'prop-types';

import ZzalList from './ZzalList';
import Tab from '@domains/Tab';
import Text from '@base/Text';
//import useAxios from '@hooks/useAxios';


const ZzalFeed = ({ likeZzals }) => {
  //const [userPostData, fetchUserPostData] = useAxios(`/posts/author/${userId}`);
  const likeZzalPosts = likeZzals.map(zzal => zzal.post);
  const likeZzalPostState = {
    isLoading: false,
    value: likeZzalPosts
  };
  //console.log(userPostData);
  //const { isLoading, value, error } = userPostData; 

  // if (isLoading) {
  //   return <div>Loading...</div>; 
  // }
  // if (error) {
  //   return <div>에러발생</div>;
  // }
  // if (!value) {
  //   return <button onClick={fetchUserPostData}>불러오기</button>;
  // }

  return (
    <>
      <Tab>
        <Text bold>좋아요</Text>
        <Text bold>업로드</Text>
      </Tab>
      <ZzalList zzalList={likeZzalPostState}></ZzalList>
    </>
  );
};

ZzalFeed.propTypes = {
  userId: PropTypes.string.isRequired,
  likeZzals: PropTypes.array.isRequired
};

export default ZzalFeed;
