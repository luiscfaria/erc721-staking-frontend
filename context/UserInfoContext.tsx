import { useContext, createContext, ReactNode, useState } from 'react';

export type AccountInfo = {
  address: string;
};

type UserContextType = {
  userValues: AccountInfo;
  updateContext: (obj: AccountInfo) => void;
};

const initialDefaultValues: AccountInfo = {
  address: ''
};

const ContextDefaultValues: UserContextType = {
  userValues: initialDefaultValues,
  updateContext: obj => {}
};

const UserContext = createContext<UserContextType>(
  ContextDefaultValues,
);

export function useUserContext() {
  return useContext(UserContext);
}

type Props = {
  children: ReactNode;
};

export function UserContextProvider({ children }: Props) {
  const [userValues, setUserValues] = useState<AccountInfo>(initialDefaultValues);

  const updateContext = (obj: AccountInfo) => {
    setUserValues(obj);
  };

  const value = {
    userValues,
    updateContext
  };

  return (
    <>
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    </>
  );
}