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
          x: element.scrollLeft,
          y: element.scrollTop
        }
      );
    };
    element.addEventListener('scroll', handleScroll, { passive: true });    
    
    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return [ref, coordinates];
};

export default useScroll;
