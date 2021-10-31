import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styled from '@emotion/styled';
import Text from '@base/Text';
import colors from '@constants/colors';
import Flex from '@base/Flex';


const parseCommentCreateDate = createDate => {
  const systemDate = new Date(Date.parse(createDate));
  const newDate = new Date();

  const diffSeconds = Math.floor((newDate - systemDate) / 1000);
  
  if (diffSeconds < 60) {
    return '방금 전';
  }
  if (diffSeconds < 60 * 60) {
    return `${Math.round(diffSeconds / 60)}분 전`;
  }
  if (diffSeconds < 60 * 90) {
    return '1시간 전';
  }
  if (diffSeconds < 60 * 60 * 24) {
    return `${Math.round(diffSeconds / (60 * 60))}시간 전`;
  }
  if (diffSeconds < 60 * 60 * 24 * 1.5) {
    return '1일 전';
  }
  if (diffSeconds < 60 * 60 * 24 * 7) {
    return `${Math.round(diffSeconds / (60 * 60 * 24))}일 전`;
  }
};

const CommentItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
 
  margin-top: 16px;
  background-color: #FBF7F2;
  border-radius: .5rem;
`;

const CommentInfo = styled.div`
  flex: 1 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CommentItem = ({ comment }) => {
  
  return (
    <CommentItemWrapper>
      <Avatar src={comment.author.image} size='64px' style={{ margin: '8px 8px 8px 12px' }}/>
      <CommentInfo>
        <Flex alignItems='center'>
          <Text bold>{comment.author.fullName}</Text>
          <Text block size="sm" bold color={colors.TEXT_SUBTLE} style={{ marginLeft: '8px',
            maxWidth: '200px' }}>{parseCommentCreateDate(comment.createdAt)}</Text>
        </Flex>
        <Text style={{ marginTop: '8px' }}>{comment.comment}</Text>
      </CommentInfo>
    </CommentItemWrapper>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object
};

export default CommentItem;
