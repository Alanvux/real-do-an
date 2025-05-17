// src/pages/dashboard/teacher/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Link } from 'react-router-dom';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  BookOpenIcon,
  BellIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

interface Course {
  id: string;
  title: string;
  studentCount: number;
  completionRate: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
}

interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  submissionCount: number;
  totalStudents: number;
}

interface Notification {
  id: string;
  type: 'submission' | 'message' | 'system';
  content: string;
  timestamp: string;
}

const TeacherDashboardPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch dashboard data
    // This would normally come from API calls to various endpoints
    // For now, we'll use placeholder data
    setTimeout(() => {
      setCourses([
        { id: '1', title: 'React Fundamentals', studentCount: 42, completionRate: 68 },
        { id: '2', title: 'Node.js Backend Development', studentCount: 37, completionRate: 52 },
        { id: '3', title: 'Modern JavaScript', studentCount: 28, completionRate: 75 }
      ]);
      
      setRecentStudents([
        { id: '1', name: 'Alex Johnson', email: 'alex@example.com', progress: 85 },
        { id: '2', name: 'Sarah Williams', email: 'sarah@example.com', progress: 67 },
        { id: '3', name: 'Michael Brown', email: 'michael@example.com', progress: 93 },
        { id: '4', name: 'Emily Davis', email: 'emily@example.com', progress: 42 }
      ]);
      
      setUpcomingAssignments([
        { id: '1', title: 'React Component Assignment', dueDate: '2025-05-20', submissionCount: 15, totalStudents: 42 },
        { id: '2', title: 'Node.js API Project', dueDate: '2025-05-25', submissionCount: 8, totalStudents: 37 },
        { id: '3', title: 'JavaScript Array Methods', dueDate: '2025-05-22', submissionCount: 12, totalStudents: 28 }
      ]);
      
      setNotifications([
        { id: '1', type: 'submission', content: 'New submission for "React Component Assignment" from Alex Johnson', timestamp: '2025-05-15T10:30:00Z' },
        { id: '2', type: 'message', content: 'Sarah Williams has a question about Node.js assignment', timestamp: '2025-05-15T09:15:00Z' },
        { id: '3', type: 'system', content: 'Monthly teaching report is now available', timestamp: '2025-05-14T16:00:00Z' }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format date for better display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format timestamp for notifications
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-success-600" />;
      case 'message':
        return <BellIcon className="h-5 w-5 text-primary-600" />;
      case 'system':
        return <AcademicCapIcon className="h-5 w-5 text-warning-600" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your courses today.</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600">
              <BookOpenIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Active Courses</h2>
              <p className="text-3xl font-bold text-primary-600">{courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600">
              <UserGroupIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Total Students</h2>
              <p className="text-3xl font-bold text-accent-600">
                {courses.reduce((total, course) => total + course.studentCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 text-success-600">
              <ClipboardDocumentListIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Pending Submissions</h2>
              <p className="text-3xl font-bold text-success-600">
                {upcomingAssignments.reduce((total, assignment) => total + assignment.submissionCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course overview and AI tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpenIcon className="h-5 w-5 mr-2 text-primary-600" />
            Your Courses
          </h2>
          
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <Link 
                    to={`/dashboard/teacher/courses/${course.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View details
                  </Link>
                </div>
                
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Students</p>
                    <p className="text-sm font-medium">{course.studentCount}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-600">Completion Rate</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{course.completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Link 
              to="/dashboard/teacher/courses"
              className="block text-center py-2 border border-dashed border-gray-300 rounded-lg text-primary-600 hover:text-primary-700 hover:bg-gray-50"
            >
              View all courses
            </Link>
          </div>
        </div>
        
        {/* AI Teaching Assistant */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <LightBulbIcon className="h-5 w-5 mr-2 text-warning-600" />
            AI Teaching Assistant
          </h2>
          
          <p className="text-gray-600 text-sm mb-4">
            Enhance your teaching with powerful AI tools that help you create quizzes, provide feedback, and identify key concepts.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/dashboard/teacher/ai-quiz-generator"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <AcademicCapIcon className="h-5 w-5 text-accent-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium">Generate Quizzes</h3>
                  <p className="text-xs text-gray-600">Create quizzes from lecture content</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/dashboard/teacher/ai-feedback"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <ClipboardDocumentListIcon className="h-5 w-5 text-success-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium">Assignment Feedback</h3>
                  <p className="text-xs text-gray-600">Generate helpful feedback for students</p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/dashboard/teacher/ai-concepts"
              className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <LightBulbIcon className="h-5 w-5 text-warning-600 mr-2" />
                <div>
                  <h3 className="text-sm font-medium">Extract Key Concepts</h3>
                  <p className="text-xs text-gray-600">Identify important concepts from your lectures</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Assignments and Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Assignments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-primary-600" />
            Upcoming Assignments
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAssignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(assignment.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {assignment.submissionCount} / {assignment.totalStudents}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full" 
                          style={{ width: `${(assignment.submissionCount / assignment.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link 
                        to={`/dashboard/teacher/assignments/${assignment.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Link 
              to="/dashboard/teacher/assignments"
              className="text-primary-600 hover:text-primary-900 text-sm font-medium"
            >
              View all assignments →
            </Link>
          </div>
        </div>
        
        {/* Recent Student Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2 text-accent-600" />
            Recent Student Activity
          </h2>
          
          <div className="space-y-4">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-700 font-medium">{student.name.charAt(0)}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-success-600 mr-1" />
                    <p className="text-xs text-gray-600">{student.progress}% progress</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Link 
              to="/dashboard/teacher/students"
              className="text-accent-600 hover:text-accent-900 text-sm font-medium"
            >
              View all students →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <BellIcon className="h-5 w-5 mr-2 text-primary-600" />
          Recent Notifications
        </h2>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-800">{notification.content}</p>
                <p className="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/dashboard/teacher/notifications"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View all notifications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;