import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Award, Phone } from 'lucide-react';
import { Student } from '../../contexts/StudentContext';
import { useAuth } from '../../contexts/AuthContext';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const { isEditorMode } = useAuth();

  return (
    <Link to={`/student/${student.id}`} className="group block">
      <div className="bg-white dark:bg-red-950/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-red-800/30 hover:border-gray-300 dark:hover:border-red-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden relative">
        {/* Edit Button for Admin */}
        {isEditorMode && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Open edit modal
              console.log('Edit student:', student.id);
            }}
            className="absolute top-3 right-3 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
          >
            <Edit3 className="h-4 w-4" />
          </button>
        )}

        {/* Student Photo */}
        <div className="aspect-square overflow-hidden">
          <img
            src={student.photo}
            alt={student.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=dc2626&color=fff&size=300`;
            }}
          />
        </div>

        {/* Student Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {student.name}
          </h3>
          
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>Class {student.class}{student.section} • Roll {student.rollNumber}</p>
            <p>Blood Group: {student.bloodGroup}</p>
          </div>

          {/* House Badge */}
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold rounded-full">
              {student.house}
            </span>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              {student.achievements.length > 0 && (
                <div className="flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  <span>{student.achievements.length}</span>
                </div>
              )}
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span>Contact</span>
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          {student.academicRecords.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-red-800/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Latest Performance</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {student.academicRecords[0].percentage}% ({student.academicRecords[0].grade})
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;