import React, { createContext, useState, useEffect, useContext } from 'react';

export const ScreenSizeContext = createContext();


const ScreenSizeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth <= 768,
    isDesktop: window.innerWidth > 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth <= 768,
        isDesktop: window.innerWidth > 768,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ScreenSizeContext.Provider value={{screenSize}}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeProvider