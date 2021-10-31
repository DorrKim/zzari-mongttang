import React, { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import ZzalList from '@domains/Zzal/ZzalList';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import CategoryCrousel from '@domains/Category';
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

  const handleChangeCategory = useCallback(id => {
    id && history.push(`/?channelId=${id}`);
  }, []);

  const handleToSearchPage = useCallback(value => {
    value && history.push(`/search?keyword=${value}`);
  }, []);
  
  return (
    <>
      <SearchBar onToSubmitPage={handleToSearchPage} />
      <CategoryCrousel channelId={channelId} onChange={handleChangeCategory} />
      <ZzalList zzalList={zzalList} />
    </>
  );
};

export default MainPage;
