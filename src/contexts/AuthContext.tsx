import React, { createContext, useContext, useState } from 'react';
import { useNotifications } from './NotificationContext';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isEditorMode: boolean;
  loginAttempts: number;
  lockoutTime: Date | null;
  adminUsers: User[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleEditorMode: () => void;
  addAdminUser: (username: string, password: string) => boolean;
  removeAdminUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addNotification } = useNotifications();
  const [user, setUser] = useState<User | null>(null);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null);
  
  // In-memory admin users storage (empty by default)
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  
  // In-memory password storage
  const [adminPasswords, setAdminPasswords] = useState<Record<string, string>>({});

  const login = (username: string, password: string): boolean => {
    // Check if locked out
    if (lockoutTime && new Date() < lockoutTime) {
      return false;
    }

    // Check admin credentials
    const adminUser = adminUsers.find(u => u.username === username);
    if (adminUser && adminPasswords[username] === password) {
      setUser(adminUser);
      setLoginAttempts(0);
      setLockoutTime(null);
      addNotification(`Logged in successfully as ${username}!`);
      return true;
    }

    // Failed login
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      const lockout = new Date();
      lockout.setHours(lockout.getHours() + 1);
      setLockoutTime(lockout);
    }

    return false;
  };

  const logout = () => {
    if (user) {
      addNotification(`Logged out successfully. Goodbye ${user.username}!`);
    }
    setUser(null);
    setIsEditorMode(false);
  };

  const toggleEditorMode = () => {
    if (user?.isAdmin) {
      const newMode = !isEditorMode;
      setIsEditorMode(newMode);
      addNotification(newMode ? 'Editor mode enabled' : 'Editor mode disabled');
    }
  };

  const addAdminUser = (username: string, password: string): boolean => {
    // Check if username already exists
    if (adminUsers.some(u => u.username === username)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      isAdmin: true
    };

    setAdminUsers(prev => [...prev, newUser]);
    setAdminPasswords(prev => ({ ...prev, [username]: password }));
    addNotification(`Admin user '${username}' created successfully`);
    return true;
  };

  const removeAdminUser = (userId: string) => {
    const userToRemove = adminUsers.find(u => u.id === userId);
    if (userToRemove) {
      setAdminUsers(prev => prev.filter(u => u.id !== userId));
      setAdminPasswords(prev => {
        const updated = { ...prev };
        delete updated[userToRemove.username];
        return updated;
      });
      addNotification(`Admin user '${userToRemove.username}' removed successfully`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isEditorMode,
        loginAttempts,
        lockoutTime,
        adminUsers,
        login,
        logout,
        toggleEditorMode,
        addAdminUser,
        removeAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};