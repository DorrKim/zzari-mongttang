import { useState, useRef, useEffect } from 'react';

const useScroll = () => {
  const [coordinates, setCoordinates] = useState({ 
    x: 0,
    y: 0 
  });
  const ref = useRef(null);

  useEffect(() => {
    const { current: element } = ref;
    if (!element){
      return;
    }

    const handleScroll = () => {
      setCoordinates(
        {
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop
        }
      );
    };
    element.addEventListener('scroll', handleScroll);    
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return [ref, coordinates];
};

export default useScroll;
