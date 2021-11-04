import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ViewPortContext = React.createContext();

export const useViewPort = () => useContext(ViewPortContext);

const ViewPortProvider = ({ children }) => {
  const [viewPortState, setViewPortState] = useState(
    window.innerWidth <= 425 ? 'mobile' : window.innerWidth <= 768 ? 'tablet' : 'web'
  );

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth <= 425) {  
        setViewPortState('mobile');
      } else if (innerWidth <= 768) {
        setViewPortState('tablet');
      } else {
        setViewPortState('web');
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ViewPortContext.Provider value={viewPortState}>
      {children}
    </ViewPortContext.Provider>
  );
};

ViewPortProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default ViewPortProvider;
