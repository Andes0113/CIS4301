import { useState, createContext, useContext } from 'react';

// Create Context object.
const AuthContext = createContext();

// Export Provider
export function AuthContextProvider(props) {
  const { children } = props;
  let lUser = localStorage.getItem('user');
  if (lUser === 'null') lUser = null;
  const [user, setUser] = useState(lUser);

  const setLocalUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  console.log('USER', user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Export useContext Hook.
export function useAuthContext() {
  return useContext(AuthContext);
}
