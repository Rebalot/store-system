import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [isRoutesLoaded, setIsRoutesLoaded] = useState(false);

  const handleRoutesLoadComplete = () => {
    setIsRoutesLoaded(true);
  };

  const handleRoutesLoading = () => {
    setIsRoutesLoaded(false);
  };

  return (
    <LoadingContext.Provider value={{ isRoutesLoaded, handleRoutesLoadComplete, handleRoutesLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};