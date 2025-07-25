import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Bell, User, Home, Users, Award, TrendingUp, BookOpen, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import AccountDropdown from './ui/AccountDropdown';
import NotificationDropdown from './ui/NotificationDropdown';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isEditorMode } = useAuth();
  const { pendingCount } = useNotifications();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Students', href: '/students', icon: Users },
    { name: 'Movement', href: '/movement', icon: TrendingUp },
    { name: 'About House', href: '/about', icon: BookOpen },
  ];

  const adminNavigation = [
    { name: 'Admin Block', href: '/admin-block', icon: Shield },
  ];
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-blue-950 dark:via-blue-900 dark:to-black transition-all duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-blue-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-blue-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              
              <Link to="/" className="flex items-center ml-2 md:ml-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Aravalli House</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Management Portal</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 min-h-[44px] ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800/50 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Admin Navigation */}
              {isAuthenticated && adminNavigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 min-h-[44px] ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:text-blue-700 dark:hover:text-blue-300'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3">
              {/* Editor Mode Indicator */}
              {isAuthenticated && isEditorMode && (
                <div className="hidden sm:flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Editor Mode
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-blue-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700/50 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <NotificationDropdown>
                <button className="relative p-2 rounded-xl bg-gray-100 dark:bg-blue-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700/50 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                  {pendingCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {pendingCount}
                    </span>
                  )}
                </button>
              </NotificationDropdown>

              {/* Account */}
              <AccountDropdown>
                <button className="p-2 rounded-xl bg-gray-100 dark:bg-blue-800/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-blue-700/50 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  <User className="h-5 w-5" />
                </button>
              </AccountDropdown>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-blue-950 border-t border-gray-200 dark:border-blue-800/50">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 min-h-[44px] text-base ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-blue-800/50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Admin Mobile Navigation */}
              {isAuthenticated && adminNavigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 min-h-[44px] text-base ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;