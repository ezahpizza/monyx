
import React, { createContext, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  return (
    <AuthContext.Provider value={{ user, loading: !isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
