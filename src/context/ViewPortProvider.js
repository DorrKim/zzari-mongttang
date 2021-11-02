import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ViewPortContext = React.createContext();

export const useViewPort = () => useContext(ViewPortContext);

const ViewPortProvider = ({ children }) => {
  const [viewPortState, setViewPortState] = useState(
    window.innerWidth <= 375 ? 'mobile' : window.innerWidth <= 768 ? 'tablet' : 'web'
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      const { innerWidth } = window;
      if (innerWidth <= 375) {
        setViewPortState('mobile');
      } else if (innerWidth <= 700) {
        setViewPortState('tablet');
      } else {
        setViewPortState('web');
      }
    });
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
