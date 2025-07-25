import { Student } from '../contexts/StudentContext';

export const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    class: 10,
    section: 'A',
    rollNumber: '101',
    dateOfBirth: '2009-03-15',
    bloodGroup: 'A+',
    house: 'Aravalli',
    address: '123 Gandhi Road, New Delhi - 110001',
    identificationMark: 'Small scar on left hand',
    hobbies: ['Cricket', 'Reading', 'Chess'],
    achievements: ['School Cricket Captain', 'Inter-house Chess Champion', 'Academic Excellence Award'],
    photo: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Rajesh Sharma',
        occupation: 'Engineer',
        contact: '+91 9876543210',
        email: 'rajesh.sharma@email.com',
        photo: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Sunita Sharma',
        occupation: 'Teacher',
        contact: '+91 9876543211',
        email: 'sunita.sharma@email.com',
        photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543212'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 95, grade: 'A+' },
          { name: 'Science', marks: 88, grade: 'A' },
          { name: 'English', marks: 92, grade: 'A+' },
          { name: 'Hindi', marks: 85, grade: 'A' },
          { name: 'Social Studies', marks: 90, grade: 'A+' }
        ],
        percentage: 90,
        grade: 'A+'
      }
    ]
  },
  {
    id: '2',
    name: 'Kavya Patel',
    class: 11,
    section: 'B',
    rollNumber: '205',
    dateOfBirth: '2008-07-22',
    bloodGroup: 'B+',
    house: 'Aravalli',
    address: '456 Park Street, Mumbai - 400001',
    identificationMark: 'Mole on right cheek',
    hobbies: ['Dance', 'Painting', 'Music'],
    achievements: ['Classical Dance Competition Winner', 'Art Exhibition First Prize', 'Cultural Secretary'],
    photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Amit Patel',
        occupation: 'Business Owner',
        contact: '+91 9876543220',
        email: 'amit.patel@email.com',
        photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Meera Patel',
        occupation: 'Artist',
        contact: '+91 9876543221',
        email: 'meera.patel@email.com',
        photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543222'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Physics', marks: 87, grade: 'A' },
          { name: 'Chemistry', marks: 91, grade: 'A+' },
          { name: 'Mathematics', marks: 89, grade: 'A' },
          { name: 'Biology', marks: 93, grade: 'A+' },
          { name: 'English', marks: 88, grade: 'A' }
        ],
        percentage: 89.6,
        grade: 'A'
      }
    ]
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    class: 9,
    section: 'A',
    rollNumber: '301',
    dateOfBirth: '2010-01-10',
    bloodGroup: 'O+',
    house: 'Aravalli',
    address: '789 Lake View, Bangalore - 560001',
    identificationMark: 'Birthmark on left shoulder',
    hobbies: ['Football', 'Video Games', 'Coding'],
    achievements: ['Inter-school Football Tournament Winner', 'Coding Competition Finalist', 'House Vice Captain'],
    photo: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Suresh Kumar',
        occupation: 'Software Engineer',
        contact: '+91 9876543230',
        email: 'suresh.kumar@email.com',
        photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Lakshmi Kumar',
        occupation: 'Doctor',
        contact: '+91 9876543231',
        email: 'lakshmi.kumar@email.com',
        photo: 'https://images.pexels.com/photos/1181665/pexels-photo-1181665.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543232'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 92, grade: 'A+' },
          { name: 'Science', marks: 89, grade: 'A' },
          { name: 'English', marks: 87, grade: 'A' },
          { name: 'Hindi', marks: 84, grade: 'A' },
          { name: 'Computer Science', marks: 96, grade: 'A+' }
        ],
        percentage: 89.6,
        grade: 'A'
      }
    ]
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    class: 12,
    section: 'A',
    rollNumber: '401',
    dateOfBirth: '2007-11-28',
    bloodGroup: 'AB+',
    house: 'Aravalli',
    address: '321 Green Avenue, Hyderabad - 500001',
    identificationMark: 'Dimple on chin',
    hobbies: ['Debate', 'Writing', 'Photography'],
    achievements: ['School Head Girl', 'National Debate Competition Winner', 'Young Author Award'],
    photo: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Venkat Reddy',
        occupation: 'Lawyer',
        contact: '+91 9876543240',
        email: 'venkat.reddy@email.com',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Sangita Reddy',
        occupation: 'Professor',
        contact: '+91 9876543241',
        email: 'sangita.reddy@email.com',
        photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543242'
    },
    academicRecords: [
      {
        semester: 'Pre-Board 2024',
        subjects: [
          { name: 'Physics', marks: 94, grade: 'A+' },
          { name: 'Chemistry', marks: 91, grade: 'A+' },
          { name: 'Mathematics', marks: 96, grade: 'A+' },
          { name: 'Computer Science', marks: 98, grade: 'A+' },
          { name: 'English', marks: 93, grade: 'A+' }
        ],
        percentage: 94.4,
        grade: 'A+'
      }
    ]
  },
  {
    id: '5',
    name: 'Priya Singh',
    class: 9,
    section: 'B',
    rollNumber: '302',
    dateOfBirth: '2010-05-16',
    bloodGroup: 'A-',
    house: 'Aravalli',
    address: '654 Rose Garden, Pune - 411001',
    identificationMark: 'Scar on right knee',
    hobbies: ['Swimming', 'Yoga', 'Gardening'],
    achievements: ['Swimming Championship Gold Medal', 'Environmental Club President', 'Science Fair Winner'],
    photo: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Anil Singh',
        occupation: 'Bank Manager',
        contact: '+91 9876543250',
        email: 'anil.singh@email.com',
        photo: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Rekha Singh',
        occupation: 'Nurse',
        contact: '+91 9876543251',
        email: 'rekha.singh@email.com',
        photo: 'https://images.pexels.com/photos/1181694/pexels-photo-1181694.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543252'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 88, grade: 'A' },
          { name: 'Science', marks: 92, grade: 'A+' },
          { name: 'English', marks: 86, grade: 'A' },
          { name: 'Hindi', marks: 89, grade: 'A' },
          { name: 'Social Studies', marks: 91, grade: 'A+' }
        ],
        percentage: 89.2,
        grade: 'A'
      }
    ]
  },
  {
    id: '6',
    name: 'Vikram Joshi',
    class: 8,
    section: 'A',
    rollNumber: '501',
    dateOfBirth: '2011-09-12',
    bloodGroup: 'B-',
    house: 'Aravalli',
    address: '987 Hill View, Shimla - 171001',
    identificationMark: 'Freckles on nose',
    hobbies: ['Basketball', 'Guitar', 'Adventure Sports'],
    achievements: ['Basketball Team Captain', 'Music Band Lead Guitarist', 'Adventure Camp Leader'],
    photo: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Deepak Joshi',
        occupation: 'Army Officer',
        contact: '+91 9876543260',
        email: 'deepak.joshi@email.com',
        photo: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Nisha Joshi',
        occupation: 'Homemaker',
        contact: '+91 9876543261',
        email: 'nisha.joshi@email.com',
        photo: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543262'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 85, grade: 'A' },
          { name: 'Science', marks: 87, grade: 'A' },
          { name: 'English', marks: 89, grade: 'A' },
          { name: 'Hindi', marks: 82, grade: 'B+' },
          { name: 'Social Studies', marks: 86, grade: 'A' }
        ],
        percentage: 85.8,
        grade: 'A'
      }
    ]
  },
  {
    id: '7',
    name: 'Ananya Gupta',
    class: 7,
    section: 'B',
    rollNumber: '601',
    dateOfBirth: '2012-04-08',
    bloodGroup: 'O-',
    house: 'Aravalli',
    address: '234 Lotus Street, Jaipur - 302001',
    identificationMark: 'Small mole on left arm',
    hobbies: ['Classical Music', 'Badminton', 'Creative Writing'],
    achievements: ['Classical Vocal Competition Winner', 'Badminton Singles Champion', 'Young Writer Award'],
    photo: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Rakesh Gupta',
        occupation: 'CA',
        contact: '+91 9876543270',
        email: 'rakesh.gupta@email.com',
        photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Pooja Gupta',
        occupation: 'Music Teacher',
        contact: '+91 9876543271',
        email: 'pooja.gupta@email.com',
        photo: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543272'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 91, grade: 'A+' },
          { name: 'Science', marks: 88, grade: 'A' },
          { name: 'English', marks: 94, grade: 'A+' },
          { name: 'Hindi', marks: 87, grade: 'A' },
          { name: 'Social Studies', marks: 90, grade: 'A+' }
        ],
        percentage: 90,
        grade: 'A+'
      }
    ]
  },
  {
    id: '8',
    name: 'Aditya Agarwal',
    class: 6,
    section: 'A',
    rollNumber: '701',
    dateOfBirth: '2013-12-03',
    bloodGroup: 'AB-',
    house: 'Aravalli',
    address: '567 Sunrise Colony, Chennai - 600001',
    identificationMark: 'Birthmark on right hand',
    hobbies: ['Table Tennis', 'Robotics', 'Astronomy'],
    achievements: ['Table Tennis District Champion', 'Robotics Competition Winner', 'Science Quiz Champion'],
    photo: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=300',
    parentDetails: {
      father: {
        name: 'Manoj Agarwal',
        occupation: 'IT Manager',
        contact: '+91 9876543280',
        email: 'manoj.agarwal@email.com',
        photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      mother: {
        name: 'Sonia Agarwal',
        occupation: 'Scientist',
        contact: '+91 9876543281',
        email: 'sonia.agarwal@email.com',
        photo: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      emergencyContact: '+91 9876543282'
    },
    academicRecords: [
      {
        semester: 'Mid-Term 2024',
        subjects: [
          { name: 'Mathematics', marks: 96, grade: 'A+' },
          { name: 'Science', marks: 94, grade: 'A+' },
          { name: 'English', marks: 90, grade: 'A+' },
          { name: 'Hindi', marks: 88, grade: 'A' },
          { name: 'Social Studies', marks: 92, grade: 'A+' }
        ],
        percentage: 92,
        grade: 'A+'
      }
    ]
  }
];