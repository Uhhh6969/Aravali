import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Welcome to the Student Management System
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            This is the home page of your student management application.
          </p>
          <p className="text-gray-600">
            Use the navigation to access different features of the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;