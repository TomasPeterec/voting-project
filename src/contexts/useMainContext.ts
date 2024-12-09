// useMainContext.ts
import { useContext } from 'react';
import { MainContext } from './MainContext'; // Path to MainContext

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }

  return context;
};
