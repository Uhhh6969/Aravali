import React, { useState } from 'react';
import { Shield, UserPlus, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';

const AdminBlock: React.FC = () => {
  const { adminUsers, addAdminUser, removeAdminUser, user } = useAuth();
  const { addNotification } = useNotifications();
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUsername.trim() || !newPassword.trim()) {
      addNotification('Please fill in all fields');
      return;
    }

    if (newUsername.length < 3) {
      addNotification('Username must be at least 3 characters long');
      return;
    }

    if (newPassword.length < 4) {
      addNotification('Password must be at least 4 characters long');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = addAdminUser(newUsername, newPassword);
    
    if (success) {
      setNewUsername('');
      setNewPassword('');
    } else {
      addNotification('Username already exists. Please choose a different one.');
    }

    setIsSubmitting(false);
  };

  const handleRemoveAdmin = (userId: string) => {
    if (user?.id === userId) {
      addNotification('You cannot remove your own admin account');
      return;
    }

    if (window.confirm('Are you sure you want to remove this admin user?')) {
      removeAdminUser(userId);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-blue-900 dark:to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Admin Block
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Manage administrator accounts and permissions
          </p>
        </div>

        {/* Warning Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
                Important Notice
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Admin user changes are stored in memory only and will be reset when the page is refreshed. 
                For persistent admin management, a backend database is required.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Admin */}
          <div className="bg-white dark:bg-blue-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-blue-800/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UserPlus className="h-6 w-6 mr-3 text-blue-600" />
              Add New Admin
            </h2>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter username (min 3 characters)"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-blue-700/50 rounded-xl bg-white dark:bg-blue-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password (min 4 characters)"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-blue-700/50 rounded-xl bg-white dark:bg-blue-900/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newUsername.trim() || !newPassword.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Admin...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add Admin User
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Current Admins */}
          <div className="bg-white dark:bg-blue-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-blue-800/30 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-600" />
              Current Admins ({adminUsers.length})
            </h2>

            <div className="space-y-3">
              {adminUsers.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-blue-900/20 rounded-xl border border-gray-200 dark:border-blue-700/30"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {admin.username}
                        {user?.id === admin.id && (
                          <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Administrator</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveAdmin(admin.id)}
                    disabled={user?.id === admin.id}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title={user?.id === admin.id ? "Cannot remove your own account" : "Remove admin"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {adminUsers.length === 0 && (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 dark:text-gray-400">No admin users found</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Management Tips */}
        <div className="mt-8 bg-gray-50 dark:bg-blue-900/20 border border-gray-200 dark:border-blue-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">
            Admin Management Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
            <li>• Admin users have full access to all system features and editor mode</li>
            <li>• You cannot remove your own admin account for security reasons</li>
            <li>• Use strong passwords and unique usernames for security</li>
            <li>• Changes are temporary and will reset on page refresh without a backend</li>
            <li>• Consider implementing proper user management with a database for production use</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBlock;