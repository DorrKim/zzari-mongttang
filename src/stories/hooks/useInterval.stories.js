import React, { useState } from 'react';
import useInterval from '@hooks/useInterval';

export default {
  title: 'Hook/useInterval'
};

export const Default = () => {
  const [array, setArray] = useState([]);
  const clear = useInterval(() => {
    setArray([...array, '추가됨 ']);
  }, 1000);
  
  return (
    <>
      <div> useIntervalFn 테스트</div>
      <div> 1초마다 추가됩니다.</div>
      <div> {array} </div>
      <button onClick={clear}>중지</button>
    </>
  );
};
