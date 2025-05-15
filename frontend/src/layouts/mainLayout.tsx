// src/layouts/MainLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearMessage } from '@/redux/slices/uiSlice';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Alert from '@/components/ui/Alert';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { message } = useSelector((state: RootState) => state.ui);
  const [showMessage, setShowMessage] = useState(false);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Notification message */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 transition-opacity duration-300 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          <Alert type={message.type} message={message.text} onClose={() => setShowMessage(false)} />
        </div>
      )}

      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;