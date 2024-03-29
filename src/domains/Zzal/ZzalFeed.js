import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ZzalList from './ZzalList';
import Tab from '@domains/Tab';
import Text from '@base/Text';
import useAxios from '@hooks/useAxios';
import Spinner from '@base/Spinner';
import { useHistory } from 'react-router';

const StyledTab = styled(Tab)`
  width: 1012px;

  @media(max-width: 1012px) {
    width: 100vw;
  }
`; 


const ZzalFeed = ({ tabInitialIndex, userId, likeZzals }) => {
  const [userPostData, fetchUserPostData] = useAxios(`/posts/author/${userId}`);
  const likeZzalPosts = likeZzals.map(zzal => zzal.post);
  const likeZzalPostState = {
    isLoading: false,
    value: likeZzalPosts
  };
  const history = useHistory();

  const handleChangeTab = useCallback(value => {
    history.push({ search: `?tabIdx=${value}` });
  }, [history]);

  useEffect(() => {
    fetchUserPostData();
  }, []);

  const { isLoading, value, error } = userPostData; 
  
  if (error) {
    history.push('/error');
  }

  return (
    <StyledTab activeIndex={tabInitialIndex || 0} onClickTabItem={handleChangeTab}>
      <Tab.Header>
        <Tab.Item index={0}><Text bold>좋아요</Text></Tab.Item>  
        <Tab.Item index={1}><Text bold>업로드</Text></Tab.Item>
      </Tab.Header>
      <Tab.Panel>
        <ZzalList noFavorite index={0} zzalList={likeZzalPostState} ></ZzalList>
        <div index={1}>
          {isLoading && <Spinner style={{ height: '80vh' }} />}
          {!isLoading && !value && <div>데이터를 불러오는데 실패했습니다.</div>}
          <ZzalList noFavorite zzalList={userPostData} ></ZzalList>
        </div>
      </Tab.Panel>
    </StyledTab>
  );
};

ZzalFeed.propTypes = {
  tabInitialIndex: PropTypes.number,
  userId: PropTypes.string.isRequired,
  likeZzals: PropTypes.array.isRequired
};

export default ZzalFeed;
