import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import Zzal from '@domains/Zzal';
import SearchBar from '@domains/Search';
import useAxios from '@hooks/useAxios';
import CategoryCrousel from '@domains/Category';
import useQuery from '@hooks/useQuery';


const ZZAL_ITEM_LOAD_COUNT = 6;

const MainPage = () => {
  const history = useHistory();
  const queryId = useQuery().get('channelId');
  const [channelId, setChannelId] = useState(queryId);
  const [zzalList, fetchList] = useAxios();

  useEffect(() => {
    channelId && fetchList({
      url: `/posts/channel/${channelId}`
    });
  }, [channelId]);

  useEffect(() => {
    setChannelId(queryId);
  }, [queryId]);

  const handleChangeCategory = useCallback(id => {
    if (!channelId){
      setChannelId(id);

      return;
    }

    id && history.push(`/?channelId=${id}`);
  }, [channelId]);

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
