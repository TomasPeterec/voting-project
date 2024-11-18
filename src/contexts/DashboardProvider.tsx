// DashboardProvider.tsx
import React, { useState, ReactNode } from 'react';
import SiteContext, { Item } from './SiteContext';

// Type for the provider props
type DashboardProviderProps = {
  children: ReactNode; // Type for children components
};

// Provider for managing the item list
const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [items, setItems] = useState<Item[]>([]); // Initial empty array of Item type

  // Function to add an item to the list
  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove an item from the list
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <SiteContext.Provider value={{ items, addItem, removeItem }}>
      {children} {/* Children that will have access to the list */}
    </SiteContext.Provider>
  );
};

export default DashboardProvider;
