import { useState } from 'react';

const useTab = (initialIdx, tablist) => {
  console.log(tablist);
  if (!tablist || !Array.isArray(tablist)) {
    return;
  }

  const [currIdx, setCurrIdx] = useState(initialIdx);
  
  // eslint-disable-next-line prefer-destructuring
  const activeTabItem = tablist[currIdx];
  
  return [activeTabItem, setCurrIdx];
};

export default useTab;
