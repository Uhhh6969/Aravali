import React, { useState } from 'react';
import { Shield, UserPlus, Trash2, Eye, EyeOff, AlertTriangle, Users, Settings, FileText, Upload, Download, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useStudents } from '../contexts/StudentContext';

const AdminBlock: React.FC = () => {
  const { adminUsers, addAdminUser, removeAdminUser, user, isEditorMode, toggleEditorMode } = useAuth();
  const { addNotification } = useNotifications();
  const { students, addStudent, deleteStudent } = useStudents();
  
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'students' | 'content' | 'settings'>('dashboard');
  const [editingContent, setEditingContent] = useState<Record<string, boolean>>({});
  const [contentValues, setContentValues] = useState<Record<string, string>>({
    'site-title': 'Aravalli House',
    'site-description': 'Management Portal for Excellence',
    'welcome-message': 'Welcome to Aravalli House - Your comprehensive digital platform for student management, academic tracking, and house administration.',
    'footer-message': 'Excellence in Education, Character in Leadership - Aravalli House - Building tomorrow\'s leaders today'
  });

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'students' | 'content') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (type === 'students') {
          // Handle student data import
          const data = JSON.parse(e.target?.result as string);
          if (Array.isArray(data)) {
            data.forEach(studentData => {
              const newStudent = {
                ...studentData,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                house: 'Aravalli'
              };
              addStudent(newStudent);
            });
            addNotification(`Successfully imported ${data.length} students`);
          }
        }
      } catch (error) {
        addNotification('Error importing file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleExportData = (type: 'students' | 'users') => {
    let data, filename;
    
    if (type === 'students') {
      data = students;
      filename = 'aravalli-students.json';
    } else {
      data = adminUsers;
      filename = 'aravalli-users.json';
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification(`${type} data exported successfully`);
  };

  const handleContentEdit = (key: string, value: string) => {
    setContentValues(prev => ({ ...prev, [key]: value }));
  };

  const saveContentEdit = (key: string) => {
    setEditingContent(prev => ({ ...prev, [key]: false }));
    addNotification('Content updated successfully');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <Users className="h-8 w-8 text-blue-400 mb-4" />
          <h3 className="text-2xl font-bold text-white">{students.length}</h3>
          <p className="text-blue-300">Total Students</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <Shield className="h-8 w-8 text-purple-400 mb-4" />
          <h3 className="text-2xl font-bold text-white">{adminUsers.length}</h3>
          <p className="text-purple-300">Admin Users</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
          <FileText className="h-8 w-8 text-green-400 mb-4" />
          <h3 className="text-2xl font-bold text-white">
            {Array.from(new Set(students.map(s => s.class))).length}
          </h3>
          <p className="text-green-300">Active Classes</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
          <Settings className="h-8 w-8 text-orange-400 mb-4" />
          <h3 className="text-2xl font-bold text-white">{isEditorMode ? 'ON' : 'OFF'}</h3>
          <p className="text-orange-300">Editor Mode</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={toggleEditorMode}
            className={`p-4 rounded-xl border transition-all ${
              isEditorMode 
                ? 'bg-orange-600/20 border-orange-500/30 text-orange-300' 
                : 'bg-green-600/20 border-green-500/30 text-green-300'
            }`}
          >
            <Edit3 className="h-6 w-6 mb-2" />
            <p className="font-semibold">{isEditorMode ? 'Disable' : 'Enable'} Editor Mode</p>
          </button>
          
          <button
            onClick={() => setActiveTab('students')}
            className="p-4 rounded-xl border bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-all"
          >
            <Users className="h-6 w-6 mb-2" />
            <p className="font-semibold">Manage Students</p>
          </button>
          
          <button
            onClick={() => setActiveTab('content')}
            className="p-4 rounded-xl border bg-purple-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-all"
          >
            <FileText className="h-6 w-6 mb-2" />
            <p className="font-semibold">Edit Content</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Add New Admin */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <UserPlus className="h-6 w-6 mr-3 text-blue-600" />
          Add New Admin
        </h3>

        <form onSubmit={handleAddAdmin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter username (min 3 characters)"
              className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter password (min 4 characters)"
                className="w-full px-4 py-3 pr-12 border border-gray-600 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !newUsername.trim() || !newPassword.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px] text-base"
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
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Shield className="h-6 w-6 mr-3 text-blue-600" />
          Current Admins ({adminUsers.length})
        </h3>

        <div className="space-y-3">
          {adminUsers.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {admin.username}
                    {user?.id === admin.id && (
                      <span className="ml-2 px-2 py-1 bg-green-800/30 text-green-300 text-xs rounded-full">
                        You
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-400">Administrator</p>
                </div>
              </div>

              <button
                onClick={() => handleRemoveAdmin(admin.id)}
                disabled={user?.id === admin.id}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-800/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] flex items-center justify-center"
                title={user?.id === admin.id ? "Cannot remove your own account" : "Remove admin"}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {adminUsers.length === 0 && (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">No admin users found</p>
            <p className="text-sm text-gray-500 mt-2">Create your first admin account above</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-6">
      {/* Import/Export Controls */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Student Data Management</h3>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import Students
            <input
              type="file"
              accept=".json,.csv"
              onChange={(e) => handleFileUpload(e, 'students')}
              className="hidden"
            />
          </label>
          
          <button
            onClick={() => handleExportData('students')}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Students
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-4">All Students ({students.length})</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {students.map((student) => (
            <div
              key={student.id}
              className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700/50"
            >
              <div className="flex items-center">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-10 h-10 rounded-lg object-cover mr-3"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=dc2626&color=fff&size=40`;
                  }}
                />
                <div>
                  <h4 className="font-semibold text-white">{student.name}</h4>
                  <p className="text-sm text-gray-400">Class {student.class}{student.section} • Roll {student.rollNumber}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
                    deleteStudent(student.id);
                    addNotification(`Student ${student.name} deleted successfully`);
                  }
                }}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-800/30 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400">No students found</p>
            <p className="text-sm text-gray-500 mt-2">Import student data or add students manually</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Website Content Management</h3>
        
        <div className="space-y-6">
          {Object.entries(contentValues).map(([key, value]) => (
            <div key={key} className="border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300 capitalize">
                  {key.replace('-', ' ')}
                </label>
                <div className="flex items-center space-x-2">
                  {editingContent[key] ? (
                    <>
                      <button
                        onClick={() => saveContentEdit(key)}
                        className="p-1 text-green-400 hover:text-green-300"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingContent(prev => ({ ...prev, [key]: false }))}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingContent(prev => ({ ...prev, [key]: true }))}
                      className="p-1 text-blue-400 hover:text-blue-300"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {editingContent[key] ? (
                <textarea
                  value={value}
                  onChange={(e) => handleContentEdit(key, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={key.includes('message') ? 3 : 1}
                />
              ) : (
                <p className="text-gray-300 bg-gray-800/30 p-3 rounded-lg">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            WordPress-Style Admin Panel
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Complete control over your Aravalli House management system
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Settings },
            { id: 'users', label: 'Users', icon: Shield },
            { id: 'students', label: 'Students', icon: Users },
            { id: 'content', label: 'Content', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUserManagement()}
          {activeTab === 'students' && renderStudentManagement()}
          {activeTab === 'content' && renderContentManagement()}
          {activeTab === 'settings' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">System Settings</h3>
              <p className="text-gray-400">Advanced settings panel coming soon...</p>
            </div>
          )}
        </div>

        {/* Footer Notice */}
        <div className="mt-8 bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-300 mb-1">
                Development Notice
              </h3>
              <p className="text-sm text-yellow-400">
                This admin panel provides full control over the system. Data is stored in memory and will reset on page refresh. For production use, implement proper database storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlock;

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