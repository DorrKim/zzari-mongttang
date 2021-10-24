import React, { useState } from 'react';
import useTimeout from '@/hooks/useTimeout';

export default {
  title: 'Hook/useTimeout'
};

export const Default = () => {
  const [state, setState] = useState(false);
  const clear = useTimeout(() => {
    setState(true);
  }, 3000);
  
  return (
    <div>
      <div>useTimeout 실험</div>
      <div>3초후에 문구가 등잡합니다.</div>
      <div>{state ? '새로고침을 눌러 초기화 하세요' : ''}</div>
      <button onClick={clear}>정지</button>
    </div>
  );
};
