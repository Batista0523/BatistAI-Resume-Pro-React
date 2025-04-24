import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  email: string;
  full_name?: string;
  password_hash: string;
  created_at: string;
  is_premium: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUserPremiumStatus: (isPremium: boolean) => void; // Function to update premium status
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

 
  const updateUserPremiumStatus = (isPremium: boolean) => {
    if (user) {
      setUser({
        ...user,
        is_premium: isPremium,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        updateUserPremiumStatus, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
