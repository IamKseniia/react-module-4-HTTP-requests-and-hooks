import { createContext, use, useState } from 'react';

const UserContext = createContext();

export const useUser = () => use(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const logIn = () => {
    setIsLoggedIn(true);
    setUsername('Mango');
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <UserContext value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext>
  );
};
