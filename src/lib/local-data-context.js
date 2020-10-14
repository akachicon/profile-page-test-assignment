import { createContext, useState } from 'react';
import { getUser, setUser } from '@/lib/local-data';

export const LocalDataContext = createContext();

export function LocalDataProvider({ children }) {
  const [contextVal, setContextVal] = useState(() => ({
    user: getUser(),
    updateUser(data) {
      setUser(data);
      setContextVal({ ...contextVal, user: getUser() });
    },
  }));

  return (
    <LocalDataContext.Provider value={contextVal}>
      {children}
    </LocalDataContext.Provider>
  );
}
