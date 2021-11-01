import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import Zzal from '@domains/Zzal';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import CategoryCrousel from '@domains/Category';
import useQuery from '@hooks/useQuery';


const DEFAULT_CATEGORY = '61755fa5359c4371f68ac695';
const ZZAL_ITEM_LOAD_COUNT = 6;

const MainPage = () => {
  const history = useHistory();
  const channelId = useQuery().get('channelId') || DEFAULT_CATEGORY;
  const [zzalList, fetchList] = useAxios();
  const [error, setError] = useState(false);

  useEffect(() => {
    zzalList.error && setError(true);
  }, [zzalList.error]);

  useEffect(() => {
    error && history.push('/error');
  }, [error]);

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
      <Zzal.ZzalList style={{ marginTop: '50px' }} zzalList={zzalList} loadCount={ZZAL_ITEM_LOAD_COUNT} />
    </>
  );
};

export default MainPage;
