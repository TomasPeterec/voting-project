// SiteContext.ts
import { createContext, useContext } from 'react';

// Define the Item type
export interface Item {
  id: number; // Use the appropriate type for your item id
  // Define other properties of the Item here
}

// Define the context type
interface SiteContextType {
  items: Item[];
  addItem: (item: Item) => void; // Define the type of addItem function
  removeItem: (id: number) => void; // Define the type of removeItem function
}

// Create the context with a default value
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// Create a custom hook to use the SiteContext
export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteContext.Provider');
  }
  return context;
};

export default SiteContext;
