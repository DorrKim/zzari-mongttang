import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styled from '@emotion/styled';
import Text from '@base/Text';
import colors from '@constants/colors';
import Flex from '@base/Flex';
import Divider from '@base/Divider';
import Icon from '@base/Icon';


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
`;

const CommentInfo = styled.div`
  flex: 1 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CommentItem = ({ isMyComment, author, createdAt, comment }) => {

  return (
    <>
      <CommentItemWrapper>
        <Avatar src={author.image} size='64px' style={{ margin: '8px 8px 8px 12px' }}/>
        <CommentInfo>
          <Flex alignItems='center' justifiContent='flex-start'>
            <Text bold>{author.fullName}</Text>
            <Text 
              block 
              size="sm" 
              bold 
              color={colors.TEXT_SUBTLE} 
              style={{ 
                marginLeft: '8px',
                maxWidth: '200px' }}>
              {parseCommentCreateDate(createdAt)}
            </Text>
            {isMyComment && <Icon name='remove' style={{ marginLeft: 'auto',
              marginRight: '8px' }}></Icon>}
          </Flex>
          <Text style={{ marginTop: '8px' }}>{comment}</Text>
        </CommentInfo>
      </CommentItemWrapper>
      <Divider color="lightgray"/>
    </>
  );
};

CommentItem.propTypes = {
  author: PropTypes.object,
  isMyComment: PropTypes.bool,
  createdAt: PropTypes.string,
  comment: PropTypes.string
};

export default CommentItem;
