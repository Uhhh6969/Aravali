import React, { useEffect, useState } from 'react';
import { ChevronDown, Sparkles, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const stats = [
    { icon: Users, label: 'Total Students', value: '156', color: 'from-blue-500 to-blue-600' },
    { icon: Award, label: 'Achievements', value: '47', color: 'from-purple-500 to-purple-600' },
    { icon: TrendingUp, label: 'Academic Excellence', value: '94%', color: 'from-pink-500 to-pink-600' },
    { icon: Sparkles, label: 'House Ranking', value: '#1', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-transparent">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-pink-100/50 dark:from-red-900/30 dark:to-black/50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-200/30 dark:bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-300/30 dark:bg-red-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-600 to-pink-600 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
            Welcome to
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Shiwalik House
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-2xl leading-relaxed">
            Excellence in Education, Character, and Leadership
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/students"
              className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[44px] flex items-center justify-center"
            >
              Explore Students
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/about"
              className="bg-white/80 hover:bg-white dark:bg-blue-950/50 dark:hover:bg-blue-950/70 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-300 dark:border-blue-700/50 hover:border-gray-400 dark:hover:border-blue-600/70 transition-all duration-300 transform hover:scale-105 min-h-[44px] flex items-center justify-center"
            >
              About House
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-full bg-white/80 hover:bg-white dark:bg-blue-950/50 dark:hover:bg-blue-950/70 backdrop-blur-sm border border-gray-300 dark:border-blue-700/50 hover:border-gray-400 dark:hover:border-blue-600/70 transition-all duration-300 animate-bounce min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ChevronDown className="h-6 w-6 text-gray-900 dark:text-white" />
        </button>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">House at a Glance</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the achievements and excellence that define Shiwalik House
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-blue-950/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-blue-800/30 hover:border-gray-300 dark:hover:border-blue-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-blue-600 to-blue-700' : index === 2 ? 'from-blue-700 to-blue-800' : 'from-blue-800 to-blue-900'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h4>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Offer</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive management and tracking for all aspects of student life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/students"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 transform hover:scale-105"
            >
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Management</h4>
              <p className="text-gray-600 dark:text-gray-300">Complete student profiles with academic records, family details, and achievements.</p>
            </Link>

            <Link
              to="/movement"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 transform hover:scale-105"
            >
              <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Movement Register</h4>
              <p className="text-gray-600 dark:text-gray-300">Digital leave request system with approval workflow and notifications.</p>
            </Link>

            <Link
              to="/about"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 dark:border-blue-700/30 hover:border-blue-300 dark:hover:border-blue-600/50 transition-all duration-300 transform hover:scale-105"
            >
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About House</h4>
              <p className="text-gray-600 dark:text-gray-300">Learn about our house values, staff, facilities, and achievements.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;