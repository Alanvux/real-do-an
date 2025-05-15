// src/layouts/DashboardLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearMessage } from '@/redux/slices/uiSlice';
import { logout } from '@/redux/slices/authSlice';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon, 
  AcademicCapIcon,
  BookOpenIcon, 
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import Alert from '@/components/ui/Alert';

interface DashboardLayoutProps {
  userRole: 'student' | 'teacher' | 'admin';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const [showMessage, setShowMessage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Clear message on location change
  useEffect(() => {
    dispatch(clearMessage());
  }, [location, dispatch]);

  // Show message when it changes
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          dispatch(clearMessage());
        }, 300); // Wait for fade-out animation
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Get navigation items based on user role
  const getNavItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/dashboard/student', icon: <ChartBarIcon className="w-5 h-5" /> },
          { name: 'My Courses', path: '/dashboard/student/courses', icon: <BookOpenIcon className="w-5 h-5" /> },
          { name: 'Assignments', path: '/dashboard/student/assignments', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
          { name: 'Grades', path: '/dashboard/student/grades', icon: <AcademicCapIcon className="w-5 h-5" /> },
          { name: 'Messages', path: '/dashboard/student/messages', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
          { name: 'AI Assistant', path: '/dashboard/student/ai-chat', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
          { name: 'Settings', path: '/dashboard/student/settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
        ];
      case 'teacher':
        return [
          { name: 'Dashboard', path: '/dashboard/teacher', icon: <ChartBarIcon className="w-5 h-5" /> },
          { name: 'My Courses', path: '/dashboard/teacher/courses', icon: <BookOpenIcon className="w-5 h-5" /> },
          { name: 'Students', path: '/dashboard/teacher/students', icon: <UserGroupIcon className="w-5 h-5" /> },
          { name: 'Assignments', path: '/dashboard/teacher/assignments', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
          { name: 'Gradebook', path: '/dashboard/teacher/gradebook', icon: <DocumentTextIcon className="w-5 h-5" /> },
          { name: 'Messages', path: '/dashboard/teacher/messages', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
          { name: 'Settings', path: '/dashboard/teacher/settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard/admin', icon: <ChartBarIcon className="w-5 h-5" /> },
          { name: 'Users', path: '/dashboard/admin/users', icon: <UserGroupIcon className="w-5 h-5" /> },
          { name: 'Courses', path: '/dashboard/admin/courses', icon: <BookOpenIcon className="w-5 h-5" /> },
          { name: 'Reports', path: '/dashboard/admin/reports', icon: <DocumentTextIcon className="w-5 h-5" /> },
          { name: 'Settings', path: '/dashboard/admin/settings', icon: <Cog6ToothIcon className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Notification message */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          <Alert type={message.type} message={message.text} onClose={() => setShowMessage(false)} />
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto md:flex-shrink-0`}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white">
          <div className="flex items-center">
            <span className="text-xl font-semibold">E-Learning</span>
          </div>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <a
                  key={item.name}
                  href={item.path}
                  className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="mr-3">{item.icon}</div>
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 w-5 h-5" />
            Logout
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 md:ml-8">
              <h1 className="text-lg font-semibold text-gray-900">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard
              </h1>
            </div>
            <div className="flex items-center">
              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 divide-y divide-gray-200">
                      <div className="px-4 py-3">
                        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        <a href="#" className="block px-4 py-3 hover:bg-gray-100">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-700">New assignment posted: React Fundamentals</p>
                              <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                          </div>
                        </a>
                        <a href="#" className="block px-4 py-3 hover:bg-gray-100">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-700">New message from Jane Smith</p>
                              <p className="text-xs text-gray-500">3 hours ago</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="px-4 py-2 text-center">
                        <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                          View all notifications
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative ml-4">
                <button
                  type="button"
                  className="flex items-center text-sm rounded-full focus:outline-none"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <span className="hidden md:flex md:items-center ml-2">
                    <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                    <svg className="ml-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
                {profileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1 divide-y divide-gray-200">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-xs text-gray-500 mt-1">Role: {userRole}</p>
                      </div>
                      <div>
                        <a href={`/dashboard/${userRole}/settings`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Settings
                        </a>
                        <a
                          href="/login"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;