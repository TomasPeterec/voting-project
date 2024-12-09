// MainContext.ts
import { createContext } from 'react';
import { AppStateType } from '../types/types'; // Import from types.ts

type AppContextType = {
  appState: AppStateType;
  appStateSetter: (item: keyof AppStateType, value: string) => void;
};

export const MainContext = createContext<AppContextType | undefined>(undefined);
