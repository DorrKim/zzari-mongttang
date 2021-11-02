import React from 'react';
import useIntervalFn from '@hooks/useIntervalFn';

export default {
  title: 'Hook/useIntervalFn'
};

export const Default = () => {
  
  const [run, clear] = useIntervalFn(() => {
    alert('실행');
  }, 3000);
  
  return (
    <>
      <div> useIntervalFn 테스트</div>
      <button onClick={run}> 3초마다 실행</button>
      <button onClick={clear}>중지</button>
    </>
  );
};
