import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import Category from '@domains/Category';
import useQuery from '@hooks/useQuery';


const DEFAULT_CATEGORY = '61755fa5359c4371f68ac695';

const MainPage = () => {
  const history = useHistory();
  const channelId = useQuery().get('channelId') || DEFAULT_CATEGORY;
  const [zzalList, fetchList] = useAxios();

  useEffect(() => {
    fetchList({
      url: `/posts/channel/${channelId}`
    });
  }, [channelId]);

  const handleLoadData = useCallback(id => {
    id && history.push(`/?channelId=${id}`);
  }, []);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search?keyword=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar onToSubmitPage={handleToSearchPage} />
      <Category.MainCategory channelId={channelId} onClickChip={handleLoadData} />
      <ZzalList zzalList={zzalList} />
    </>
  );
};

export default MainPage;
