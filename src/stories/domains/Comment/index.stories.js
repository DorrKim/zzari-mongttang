import React, { useEffect } from 'react';
import Comment from '@domains/Comment';
import useAxios from '@hooks/useAxios';

export default {
  title: 'Domains/Comment',
  component: Comment
};

export const Default = () => {
  const [postAPIState, fetchPostAPIState] = useAxios('/posts/61754a612f037c2ea0595b9c');
  useEffect(() => {
    fetchPostAPIState();
  }, [fetchPostAPIState]);
  const { isLoading, value, error } = postAPIState; 
  if (isLoading) return <div>Loading....</div>;

  if (error) return <div>에러가 발생</div>;

  if (!value) return <button onClick={() => fetchPostAPIState}>불러오기</button>;
  const { comments } = value;
  
  return (
    <Comment comments={comments}></Comment>
  );
};
