import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import Button from '@base/Button';
import useAxios from '@hooks/useAxios';
import CategoryChip from './CategoryChip';
import CategoryList from './CategoryList';


const MainCategory = ({ channelId, onChange }) => {
  const [categoryList, fetchList] = useAxios('/channels');
  const { isLoading, value } = categoryList;

  const [offsetX, setOffsetX] = useState(0);

  const [ref, innerRef] = [useRef(null), useRef(null)];
  const categoryListWidth = ref.current?.offsetWidth;
  const viewerWidth = innerRef.current?.offsetWidth;

  useEffect(() => {
    fetchList();
  }, []);

  const selectedChip = useMemo(() => value 
    && Object.values(categoryList.value)
      .findIndex(({ _id }) => _id === channelId), [value, channelId]
  );
 
  const handlePrev = () => {
    const MAX_OFFSET_X = 0;
    if (offsetX + viewerWidth > MAX_OFFSET_X) {
      setOffsetX(MAX_OFFSET_X);
      ref.current.style.transform = `translateX(${MAX_OFFSET_X}px)`;
    } else {
      setOffsetX(offsetX => offsetX + viewerWidth);
      ref.current.style.transform = `translateX(${offsetX + viewerWidth}px)`;
    }
  };

  const handleNext = () => {
    if (!categoryListWidth) {
      return;
    }

    const MIN_OFFSET_X = - categoryListWidth + viewerWidth;
    if (offsetX - viewerWidth < MIN_OFFSET_X) {
      ref.current.style.transform = `translateX(${MIN_OFFSET_X}px)`;
      setOffsetX(MIN_OFFSET_X);
    } else {
      ref.current.style.transform = `translateX(${offsetX - viewerWidth}px)`;
      setOffsetX(offsetX => offsetX - viewerWidth);
    }
  };

  const handleChangeChip = useCallback(e => {
    onChange(e.id);
  }, [onChange]);

  return (
    <>
      <Wrapper>
        <LeftButton offsetX={offsetX} onClick={handlePrev}>Prev</LeftButton>
        <Inner ref={innerRef}>
          <RefWrapper ref={ref}>
            <StyledCategoryList selectedIndex={selectedChip} onChange={handleChangeChip}>
              {!isLoading && (value?.map(({ _id, name }) => (
                <CategoryChip style={{ margin: '0 5px' }} size='lg' key={_id} name={name} id={_id} />
              ))
              )}
            </StyledCategoryList>
          </RefWrapper>
        </Inner>
        <RightButton offset={{ offsetX,
          categoryListWidth,
          viewerWidth
        }} onClick={handleNext}>Next</RightButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  overflow-x: hidden;
  position: relative;
  width: 600px;
  overflow-x: hidden;
  margin: 10px auto;
  @media(max-width: 630px) {
    width: 90vw;
  }
  padding: 0 30px;
`;

const RefWrapper = styled.div`
  transition: 0.5s ease-in;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;  
  transition: transform 0.5s;
  overflow-x: hidden;
  height: 50px;
`;

const StyledCategoryList = styled(CategoryList)`
  display:flex;
  flex-wrap: nowrap;
`;

const LeftButton = styled(Button)`
  ${props => props.offsetX === 0 
    ? `
      pointer-events: none;
      opacity: 0.1;
    ` 
    : ''
}
  transition: 1s ease-in-out;
  position:absolute;
  top:0;
  left:0;
  width: 30px;
  height: 30px;
`;

const RightButton = styled(Button)`
  ${({ offset: { offsetX, categoryListWidth, viewerWidth }}) => viewerWidth - offsetX === categoryListWidth
    ? `
      pointer-events: none;
      opacity: 0.1;
    ` 
    : ''
} 
  transition: 1s ease-in-out;
  position:absolute;
  top:0;
  right:0;
  width: 30px;
  height: 30px;
`;

MainCategory.propTypes = {
  channelId: PropTypes.string,
  onChange: PropTypes.func
};

export default MainCategory;
