import React, { useState } from 'react';
import useTimeoutFn from '@/hooks/useTimeoutFn';

export default {
  title: 'Hook/useTimeoutFn'
};

export const Default = () => {
  const [state, setState] = useState(false);
  const [run, clear] = useTimeoutFn(() => {
    setState(true);
  }, 3000);
  
  return (
    <>
      <div>useTimeoutFn 실험</div>
      <div>{state ? '짜잔' : ''}</div>
      <button onClick={run}>3초뒤 실행</button>
      <button onClick={clear}>정지</button>
      <button onClick={() => setState(false)}>초기화</button>
    </>
  );
};
