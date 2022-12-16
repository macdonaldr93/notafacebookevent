import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getUsername as getUsernameFromCookie,
  setUsername as setUsernameCookie,
} from '../utils/cookies';

const UsernameContext = createContext<{
  username: string | undefined;
  changeUsername: (username: string) => void;
}>({
  username: undefined,
  changeUsername: () => {},
});

export function UsernameProvider({ children }: PropsWithChildren<{}>) {
  const [username, setUsername] = useState<string>();

  const changeUsername = (username: string) => {
    setUsernameCookie(username);
    setUsername(username);
  };

  useEffect(() => {
    setUsername(getUsernameFromCookie());
  }, []);

  return (
    <UsernameContext.Provider value={{ username, changeUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export const useUsername = () => useContext(UsernameContext);
