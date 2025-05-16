import { getCurrentUser } from '@/lib/appwrite/api';
import type { IContextType, IUser } from '@/types';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};
const INITIAL_STATE = {
  // user : { ...INITIAL_USER },
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);
console.log('AuthContext');
console.log(AuthContext);
// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!AuthContext) {
//     throw new Error('AuthContext is not defined');
//   }
//   return context;
// };

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      console.log('currentAccount=======================');
      console.log(currentAccount);
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } catch (error) {
      console.error('Auth check error in AuthContext:', error);
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validateSession = async () => {
      const cookieFallback = localStorage.getItem('cookieFallback');
      // Appwrite uses 'cookieFallback' to store session information for web platforms.
      // If it's '[]' or null, it often means no active session.
      if (cookieFallback === '[]' || cookieFallback === null) {
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        setIsLoading(false); // Ensure loading is set to false
        // Only navigate if not on a public route already (e.g. sign-in, sign-up)
        // This check depends on your routing setup.
        if (
          window.location.pathname !== '/sign-in' &&
          window.location.pathname !== '/sign-up'
        ) {
          navigate('/sign-in');
        }
        return;
      }

      // If cookieFallback exists, try to verify the session with the backend.
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated) {
        // If checkAuthUser fails, navigate to sign-in unless already there.
        if (
          window.location.pathname !== '/sign-in' &&
          window.location.pathname !== '/sign-up'
        ) {
          navigate('/sign-in');
        }
      }
    };

    validateSession();
  }, [navigate]);
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
