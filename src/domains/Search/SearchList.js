import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import styled from '@emotion/styled';
import ZzalItem from '@domains/Zzal/ZzalItem';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import Spinner from '@base/Spinner';
import Avatar from '@components/Avatar';
import colors from '@constants/colors';
import Text from '@base/Text';


const SearchList = (
  { searchResponse = {}, 
    noFavorite, 
    loadCount = 6, 
    style, 
    ...props }
) => {
  const history = useHistory();
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(0);
  const { isLoading, value, error } = searchResponse;
  const [isError, setIsError] = useState(false);
  const [sortedZzalList, setSortedZzalList] = useState([]);

  useEffect(() => {
    value && setSortedZzalList(Object.values(value).sort((a, b) => b['likes'].length - a['likes'].length));
  }, [value]);

  useEffect(() => {
    error && setIsError(true);
  }, [error]);

  useEffect(() => {
    isError && history.push('/error');
  }, [isError]);

  useInfiniteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (itemCount < value?.length && isIntersecting) {
        setItemCount(prevCount => prevCount + loadCount);
      }
    },
    threshold: 0.5
  });

  const handleClickAvatar = useCallback(e => {
    e.target.id && history.push(`/user/${e.target.id}`);
  }, [history]);

  if (isLoading) {
    return <Spinner style={{ height: '80vh' }} />;
  }

  return (
    <StyledList style={{ ...style }} {...props}>
      {sortedZzalList?.filter((_, idx) => idx < itemCount)
        .map(item => 'channel' in item 
          ? (<ZzalItem 
            key={item._id} 
            imageUrl={item.image} 
            height='100%' 
            postId={item._id} 
            likes={item.likes}
            noFavorite={noFavorite}
          />
          )
          : (<AvatarWrapper key={item._id}> 
            <StyledAvatar id={item._id} src={item.image} fullName={item.fullName} onClick={handleClickAvatar} />
            <Text block>{item.fullName}</Text>
          </AvatarWrapper>
          )
        )
      }  
      <div ref={setTarget}></div>
    </StyledList>
  );
};

const StyledList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 1012px;
  gap: 8px;
  padding: 36px;

  @media(max-width: 1012px) {
    padding: 20px;
    width: 100vw;
  }

  @media(max-width: 590px) {
    padding: 4px;
    gap: 4px;
  }
`;

const AvatarWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
  width: 229px;
  height: 229px;
  position: relative;
  
  @media(max-width: 1012px) {
    width: calc((100vw - 64px) / 4);
    height: calc((100vw - 64px) / 4);
  }

  @media(max-width: 768px) {
    width: calc((100vw - 56px) / 3);
    height: calc((100vw - 56px) / 3);
  }

  @media(max-width: 590px) {
    width: calc((100vw - 12px) / 2);
    height: calc((100vw - 12px) / 2);
  } 
`;

const StyledAvatar = styled(Avatar)`
box-shadow: 0 3px 3px ${colors.PRIMARY_BACKGROUND};

width: 80%;
height: 80%;

&:hover {
  border: 4px solid ${colors.PRIMARY_BRIGHT};
}
`;


SearchList.propTypes = {
  searchResponse: PropTypes.object,
  noFavorite: PropTypes.bool,
  loadCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  style: PropTypes.object
};

export default SearchList;
