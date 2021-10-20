import { useCallback, useState } from 'react';


const useToggle = initialState => {
  const [checked, setChecked] = useState(initialState);
  const toggle = useCallback(() => setChecked(checked => !checked));

  return [checked, toggle];
};

export default useToggle;
