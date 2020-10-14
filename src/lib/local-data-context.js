import { createContext } from 'react';
import useState from 'react-use-batched-state';
import { getUser, setUser } from '@/lib/local-data';
import { denormalizeUserData } from '@/lib/utils';

export const LocalDataContext = createContext();

export function LocalDataProvider({ children }) {
  const initUser = getUser();

  const [contextVal, setContextVal] = useState(() => ({
    rawUser: initUser,
    user: denormalizeUserData(initUser),
    updateUser(data) {
      const user = setUser(data);
      setContextVal({
        ...contextVal,
        rawUser: user,
        user: denormalizeUserData(user),
      });
    },
  }));

  return (
    <LocalDataContext.Provider value={contextVal}>
      {children}
    </LocalDataContext.Provider>
  );
}
