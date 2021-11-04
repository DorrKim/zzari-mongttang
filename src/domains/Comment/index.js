import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import styled from '@emotion/styled';
import Flex from '@base/Flex';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

const CommentList = styled.li`
  list-style: none;
  background-color: #fcfcfc;
`;

const Comment = ({ comments, initialItemCount = 6, myUserId, handleClickDelete }) => {
  const [target, setTarget] = useState(null);
  const [itemCount, setItemCount] = useState(initialItemCount);

  useInfiniteScroll({
    target,
    onIntersect: entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting && itemCount < comments.length) {
          setItemCount(itemCount => itemCount + initialItemCount);
        }
      });
    },
    threshold: 0.5
  });

  // console.log(comments.reverse());
  
  return (
    <Flex column>
      <CommentList>
        {[...comments]
          .reverse()
          .filter((_, idx) => idx < itemCount)
          .map(({ _id, comment, author, createdAt }) => (
            // <ShowAnimation key={_id} id={_id}>
            <CommentItem 
              key={_id} 
              id={_id}
              isMyComment={myUserId === author._id} 
              comment={comment}
              author={author}
              createdAt={createdAt}
              handleClickDelete={handleClickDelete}
            />
            // </ShowAnimation>
          ))
        }
        <div ref={setTarget} style={{ width: '100%',
          height: 10 }}></div>
      </CommentList>
    </Flex>
  );
};

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
  initialItemCount: PropTypes.number,
  myUserId: PropTypes.string,
  myName: PropTypes.string,
  handleClickDelete: PropTypes.func
};

export default Comment;
