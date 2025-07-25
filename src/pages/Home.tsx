import React from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Award, BookOpen, ArrowRight, Star, Calendar, Shield } from 'lucide-react';
import { useStudents } from '../contexts/StudentContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { students } = useStudents();
  const { pendingCount } = useNotifications();
  const { isAuthenticated, user } = useAuth();

  const totalStudents = students.length;
  const classDistribution = students.reduce((acc, student) => {
    acc[student.class] = (acc[student.class] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const topPerformers = students
    .filter(s => s.academicRecords.length > 0)
    .sort((a, b) => (b.academicRecords[0]?.percentage || 0) - (a.academicRecords[0]?.percentage || 0))
    .slice(0, 3);

  const quickStats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      link: '/students'
    },
    {
      title: 'Pending Requests',
      value: pendingCount,
      icon: TrendingUp,
      color: 'from-yellow-600 to-yellow-700',
      link: '/movement'
    },
    {
      title: 'Active Classes',
      value: Object.keys(classDistribution).length,
      icon: BookOpen,
      color: 'from-green-600 to-green-700',
      link: '/students'
    },
    {
      title: 'House Achievements',
      value: students.reduce((acc, s) => acc + s.achievements.length, 0),
      icon: Award,
      color: 'from-purple-600 to-purple-700',
      link: '/about'
    }
  ];

  const quickActions = [
    {
      title: 'View All Students',
      description: 'Browse complete student directory',
      icon: Users,
      link: '/students',
      color: 'from-blue-600 to-blue-700'
    },
    {
      title: 'Movement Register',
      description: 'Check leave requests and approvals',
      icon: TrendingUp,
      link: '/movement',
      color: 'from-purple-600 to-purple-700'
    },
    {
      title: 'About Shiwalik House',
      description: 'Learn about our house and achievements',
      icon: BookOpen,
      link: '/about',
      color: 'from-green-600 to-green-700'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
            Welcome to Aravalli House
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {isAuthenticated 
              ? `Welcome back, ${user?.username}! Manage your Aravalli House with our comprehensive digital platform.`
              : 'Your comprehensive digital platform for student management, academic tracking, and house administration.'
            }
          </p>

          {!isAuthenticated && (
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openLoginModal'))}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Shield className="h-5 w-5 mr-2" />
              Admin Login
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8" />
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-white/80">{stat.title}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="group block"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {action.description}
                      </p>
                      <div className="flex items-center mt-3 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity / Top Performers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Performers</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              {topPerformers.length > 0 ? (
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <Link
                      key={student.id}
                      to={`/student/${student.id}`}
                      className="flex items-center p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg mr-3">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=dc2626&color=fff&size=40`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {student.name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Class {student.class}{student.section} • {student.academicRecords[0]?.percentage}%
                        </p>
                      </div>
                      <Star className="h-4 w-4 text-yellow-500" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500 dark:text-gray-400">No academic records available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Class Distribution */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Class Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(classDistribution)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([classNum, count]) => (
                <Link
                  key={classNum}
                  to={`/students?class=${classNum}`}
                  className="group block"
                >
                  <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 text-center transition-all duration-200 transform hover:scale-105">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {count}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Class {classNum}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Excellence in Education, Character in Leadership
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Aravalli House - Building tomorrow's leaders today
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;