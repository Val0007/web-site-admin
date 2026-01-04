import React, { useState, useEffect, createContext, useContext } from 'react';
import { LoginPage } from '../pages/LoginPage';

// Auth Context
interface AuthContextProps{
    token:string|undefined
      login:()=>void
      logout:()=>void
      isAuthenticated:()=>boolean
      loading:boolean
}
const AuthContext = createContext<AuthContextProps>({token:"",login:()=>{},logout:()=>{},isAuthenticated:()=>false,loading:true});

// Auth Provider Component
export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const savedToken = localStorage.getItem('auth_token');
    
    if (savedToken) {
      setToken(savedToken);
    }
    
    // Handle redirect from Google OAuth
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      // Store token and redirect to clean URL
      localStorage.setItem('auth_token', tokenFromUrl);
      setToken(tokenFromUrl);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    setLoading(false);
  }, []);

  const login = () => {
    // Redirect to your backend Google OAuth endpoint
   const url =  import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD

    window.location.href =  `${url}/auth/google/login`
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setToken("");
  };

  const isAuthenticated = () => {  //gives true or false , if token is undefined returns false else returns true
    return !!token; 
  };

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children }:{ children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <LoginPage />;
  }

  return children;
};