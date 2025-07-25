import React, { useState } from 'react';
import { X, Upload, User, BookOpen, Phone, Mail, MapPin, Calendar, Droplets } from 'lucide-react';
import { useStudents } from '../../contexts/StudentContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose }) => {
  const { addStudent } = useStudents();
  const { addNotification } = useNotifications();
  
  const [formData, setFormData] = useState({
    name: '',
    class: 6,
    section: 'A',
    rollNumber: '',
    dateOfBirth: '',
    bloodGroup: 'A+',
    house: 'Aravalli',
    address: '',
    identificationMark: '',
    hobbies: '',
    achievements: '',
    photo: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=300',
    fatherName: '',
    fatherOccupation: '',
    fatherContact: '',
    fatherEmail: '',
    fatherPhoto: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300',
    motherName: '',
    motherOccupation: '',
    motherContact: '',
    motherEmail: '',
    motherPhoto: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
    emergencyContact: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'class' ? parseInt(value) : value
    }));
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newStudent = {
        id: Date.now().toString(),
        name: formData.name,
        class: formData.class,
        section: formData.section,
        rollNumber: formData.rollNumber,
        dateOfBirth: formData.dateOfBirth,
        bloodGroup: formData.bloodGroup,
        house: formData.house,
        address: formData.address,
        identificationMark: formData.identificationMark,
        hobbies: formData.hobbies.split(',').map(h => h.trim()).filter(h => h),
        achievements: formData.achievements.split(',').map(a => a.trim()).filter(a => a),
        photo: formData.photo,
        parentDetails: {
          father: {
            name: formData.fatherName,
            occupation: formData.fatherOccupation,
            contact: formData.fatherContact,
            email: formData.fatherEmail,
            photo: formData.fatherPhoto
          },
          mother: {
            name: formData.motherName,
            occupation: formData.motherOccupation,
            contact: formData.motherContact,
            email: formData.motherEmail,
            photo: formData.motherPhoto
          },
          emergencyContact: formData.emergencyContact
        },
        academicRecords: []
      };

      addStudent(newStudent);
      addNotification(`Student ${formData.name} added successfully!`);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        class: 6,
        section: 'A',
        rollNumber: '',
        dateOfBirth: '',
        bloodGroup: 'A+',
        house: 'Shiwalik',
        address: '',
        identificationMark: '',
        hobbies: '',
        achievements: '',
        photo: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=300',
        fatherName: '',
        fatherOccupation: '',
        fatherContact: '',
        fatherEmail: '',
        fatherPhoto: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300',
        motherName: '',
        motherOccupation: '',
        motherContact: '',
        motherEmail: '',
        motherPhoto: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
        emergencyContact: ''
      });
    } catch (error) {
      addNotification('Error adding student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-red-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-red-800/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-6 w-6 mr-3" />
              <h2 className="text-2xl font-bold">Add New Student</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Class *
                  </label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Section *
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {['A', 'B', 'C', 'D'].map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Identification Mark
                  </label>
                  <input
                    type="text"
                    name="identificationMark"
                    value={formData.identificationMark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    House
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={formData.house}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hobbies (comma separated)
                  </label>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    placeholder="Cricket, Reading, Chess"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Achievements (comma separated)
                  </label>
                  <input
                    type="text"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="School Captain, Academic Excellence"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Parent Information</h3>
              
              {/* Father Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Father Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="fatherContact"
                      value={formData.fatherContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Mother Details */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Mother Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mother's Name *
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="motherContact"
                      value={formData.motherContact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact *
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-red-700/50 rounded-xl bg-white dark:bg-red-900/30 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-red-700/50">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 dark:border-red-700/50 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-red-800/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Adding Student...
                  </>
                ) : (
                  'Add Student'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;