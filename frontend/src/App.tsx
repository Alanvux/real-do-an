// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Dashboard Pages - Student
import StudentDashboardPage from './pages/dashboard/student/DashboardPage';
import StudentCoursesPage from './pages/dashboard/student/CoursesPage';
import StudentCourseDetailPage from './pages/dashboard/student/CourseDetailPage';
import StudentAssignmentsPage from './pages/dashboard/student/AssignmentsPage';
import StudentGradesPage from './pages/dashboard/student/GradesPage';
import StudentMessagesPage from './pages/dashboard/student/MessagesPage';
import StudentSettingsPage from './pages/dashboard/student/SettingsPage';
import StudentAIChatPage from './pages/dashboard/student/AIChatPage';

// Dashboard Pages - Teacher
import TeacherDashboardPage from './pages/dashboard/teacher/DashboardPage';
import TeacherCoursesPage from './pages/dashboard/teacher/CoursesPage';
import TeacherCourseDetailPage from './pages/dashboard/teacher/CourseDetailPage';
import TeacherStudentsPage from './pages/dashboard/teacher/StudentsPage';
import TeacherStudentDetailPage from './pages/dashboard/teacher/StudentDetailPage';
import TeacherAssignmentsPage from './pages/dashboard/teacher/AssignmentsPage';
import TeacherGradebookPage from './pages/dashboard/teacher/GradebookPage';
import TeacherMessagesPage from './pages/dashboard/teacher/MessagesPage';
import TeacherSettingsPage from './pages/dashboard/teacher/SettingsPage';

// Dashboard Pages - Admin
import AdminDashboardPage from './pages/dashboard/admin/DashboardPage';
import AdminUsersPage from './pages/dashboard/admin/UsersPage';
import AdminCoursesPage from './pages/dashboard/admin/CoursesPage';
import AdminReportsPage from './pages/dashboard/admin/ReportsPage';
import AdminSettingsPage from './pages/dashboard/admin/SettingsPage';

// Helper components for route protection
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to dashboard based on user role
    if (user.role === 'student') {
      return <Navigate to="/dashboard/student" />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/dashboard/teacher" />;
    } else if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" />;
    }
  }
  
  return children;
};

const App = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Redirect authenticated users from login/register to their dashboard
  const redirectAuthorized = (element: JSX.Element) => {
    if (isAuthenticated && user) {
      if (user.role === 'student') {
        return <Navigate to="/dashboard/student" />;
      } else if (user.role === 'teacher') {
        return <Navigate to="/dashboard/teacher" />;
      } else if (user.role === 'admin') {
        return <Navigate to="/dashboard/admin" />;
      }
    }
    return element;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={redirectAuthorized(<LoginPage />)} />
          <Route path="register" element={redirectAuthorized(<RegisterPage />)} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route 
          path="/dashboard/student" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardLayout userRole="student" />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboardPage />} />
          <Route path="courses" element={<StudentCoursesPage />} />
          <Route path="courses/:id" element={<StudentCourseDetailPage />} />
          <Route path="assignments" element={<StudentAssignmentsPage />} />
          <Route path="grades" element={<StudentGradesPage />} />
          <Route path="messages" element={<StudentMessagesPage />} />
          <Route path="settings" element={<StudentSettingsPage />} />
          <Route path="ai-chat" element={<StudentAIChatPage />} />
        </Route>

        {/* Teacher Dashboard Routes */}
        <Route 
          path="/dashboard/teacher" 
          element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <DashboardLayout userRole="teacher" />
            </ProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="courses/:id" element={<TeacherCourseDetailPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="students/:id" element={<TeacherStudentDetailPage />} />
          <Route path="assignments" element={<TeacherAssignmentsPage />} />
          <Route path="gradebook" element={<TeacherGradebookPage />} />
          <Route path="messages" element={<TeacherMessagesPage />} />
          <Route path="settings" element={<TeacherSettingsPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout userRole="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;