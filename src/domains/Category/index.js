import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import Button from '@base/Button';
import useAxios from '@hooks/useAxios';
import CategoryChip from './CategoryChip';
import CategoryList from './CategoryList';
import { ICON_TYPES } from '@constants/icons';
// import colors from '@constants/colors';


const MainCategory = ({ channelId, onChange }) => {
  const [categoryList, fetchList] = useAxios('/channels');
  const { isLoading, value } = categoryList;
  const [offsetX, setOffsetX] = useState(0);
  const [categoryListWidth, setCategoryListWidth] = useState(0);
  const [viewerWidth, setViewerWidth] = useState(0);
  const distance = useMemo(() => viewerWidth / 3, [viewerWidth]);

  const [ref, innerRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    value && ref.current && setCategoryListWidth(ref.current.offsetWidth);
    value && innerRef.current && setViewerWidth(innerRef.current.offsetWidth);
  }, [value && ref.current, innerRef.current]);

  const selectedChip = useMemo(() => value 
    && Object.values(value)
      .findIndex(({ _id }) => _id === channelId), [value, channelId]
  );
 
  const handleOffsetX = useCallback(width => {
    setOffsetX(width);
    ref.current.style.transform = `translateX(${width}px)`;
  }, [ref]);
  
  const handlePrev = useCallback(() => {
    const MAX_OFFSET_X = 0;

    offsetX + distance > MAX_OFFSET_X 
      ? handleOffsetX(MAX_OFFSET_X) 
      : handleOffsetX(offsetX + distance);
  }, [offsetX, distance, handleOffsetX]);

  const handleNext = useCallback(() => {
    if (!categoryListWidth) {
      return;
    }

    const MIN_OFFSET_X = - categoryListWidth + viewerWidth;

    offsetX - distance < MIN_OFFSET_X 
      ? handleOffsetX(MIN_OFFSET_X) 
      : handleOffsetX(offsetX - distance);
  }, [offsetX, viewerWidth, distance, handleOffsetX, categoryListWidth]);

  const handleChangeChip = useCallback(e => {
    onChange(e.id);
  }, [onChange]);

  // selectedChip 없을시 0 Index 값 Select
  useEffect(() => {
    if (value && selectedChip === - 1) {
      const [{ _id: defaultChannelId }] = Object.values(value);
      onChange && onChange(defaultChannelId);
    } 
  }, [selectedChip, value]);


  return (
    <>
      <Wrapper>
        <LeftButton offsetX={offsetX} onClick={handlePrev}>
          <ICON_TYPES.moveLeft style={{ height: '16px',
            lineHeight: '18px' }} />
        </LeftButton>
        <Inner ref={innerRef}>
          <RefWrapper ref={ref}>
            <StyledCategoryList selectedIndex={selectedChip} onChange={handleChangeChip}>
              {!isLoading && (value?.map(({ _id, name }) => (
                <CategoryChip style={{ margin: '0 5px' }} key={_id} name={name} id={_id} />
              ))
              )}
            </StyledCategoryList>
          </RefWrapper>
        </Inner>
        <RightButton offset={{ offsetX,
          categoryListWidth,
          viewerWidth
        }} onClick={handleNext}>
          <ICON_TYPES.moveRight style={{ height: '16px',
            lineHeight: '18px' }} />
        </RightButton>
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
  font-family: 'netmarbleM';
  @media(max-width: 630px) {
    width: 90vw;
  }
  &::after, &::before {
    display: block;
    content: '';
    width: 50px;
  }
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
  transition: 0.2s ease-in-out;
  position:absolute;
  top:0;
  left:0;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 20px;
  text-align: center;
  &:hover {
    border: 1px solid #ddd;
    border-radius: 50px;
  }
`;

const RightButton = styled(Button)`
  ${({ offset: { offsetX, categoryListWidth, viewerWidth }}) => viewerWidth - offsetX === categoryListWidth
    ? `
      pointer-events: none;
      opacity: 0.1;
    ` 
    : ''
} 
  transition: 0.2s ease-in-out;
  position:absolute;
  top:0;
  right:0;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  background-color: transparent;
  font-size: 20px;
  text-align: center;
  /* color: colors.ACCENT; */
  &:hover {
    border: 1px solid #ddd;
    border-radius: 50px;
    transition: 0s;
  }
`;

MainCategory.propTypes = {
  channelId: PropTypes.string,
  onChange: PropTypes.func
};

export default MainCategory;
