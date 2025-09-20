import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { IssueManagement } from './components/Issues/IssueManagement';

function App() {
  const { user, isLoading, login, logout, isAuthenticated } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'issues':
        return <IssueManagement />;
      case 'map':
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Map View</h2>
              <p className="text-gray-600">Interactive map integration coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
              <p className="text-gray-600">Advanced analytics and reporting features coming soon...</p>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Management</h2>
              <p className="text-gray-600">Staff management features coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">System settings and configuration coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar
        user={user}
        onLogout={logout}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <main className="flex-1 overflow-hidden">
        {renderActiveView()}
      </main>
    </div>
  );
}

export default App;