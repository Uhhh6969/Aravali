import React, { useState, useEffect } from 'react';
import { X, Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loginAttempts, lockoutTime, isAuthenticated } = useAuth();

  // Check if we should show the modal based on URL or other triggers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Listen for login trigger events
  useEffect(() => {
    const handleLoginTrigger = () => setIsOpen(true);
    window.addEventListener('openLoginModal', handleLoginTrigger);
    return () => window.removeEventListener('openLoginModal', handleLoginTrigger);
  }, []);

  // Close modal when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setIsOpen(false);
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check lockout
    if (lockoutTime && new Date() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime.getTime() - new Date().getTime()) / (1000 * 60));
      setError(`Account locked. Try again in ${remainingTime} minutes.`);
      setIsLoading(false);
      return;
    }

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (!success) {
      setError('Invalid credentials. Please try again.');
      setPassword('');
    }
    
    setIsLoading(false);
  };

  const getRemainingLockoutTime = () => {
    if (!lockoutTime) return 0;
    return Math.ceil((lockoutTime.getTime() - new Date().getTime()) / (1000 * 60));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-red-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-red-800/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin Login</h2>
                <p className="text-red-100 text-sm">Shiwalik House Portal</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-blue-700/50 rounded-xl bg-white dark:bg-blue-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="Enter username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-blue-700/50 rounded-xl bg-white dark:bg-blue-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 rounded-xl">
                <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-blue-700 dark:text-blue-300">{error}</span>
              </div>
            )}

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && !lockoutTime && (
              <div className="text-sm text-blue-600 dark:text-blue-400 text-center">
                {3 - loginAttempts} attempts remaining
              </div>
            )}

            {/* Lockout Warning */}
            {lockoutTime && getRemainingLockoutTime() > 0 && (
              <div className="text-sm text-blue-600 dark:text-blue-400 text-center">
                Account locked for {getRemainingLockoutTime()} minutes
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (lockoutTime && getRemainingLockoutTime() > 0)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] text-base"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Admin Credentials Info */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-blue-900/20 rounded-xl border border-gray-200 dark:border-blue-700/30">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Admin Credentials:</h4>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>Username: <code className="bg-gray-200 dark:bg-blue-800/50 px-1 rounded">roti</code> | Password: <code className="bg-gray-200 dark:bg-blue-800/50 px-1 rounded">curry</code></div>
              <div>Username: <code className="bg-gray-200 dark:bg-blue-800/50 px-1 rounded">abhi</code> | Password: <code className="bg-gray-200 dark:bg-blue-800/50 px-1 rounded">gobi</code></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;