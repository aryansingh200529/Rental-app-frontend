// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // ✅ merged SignupPage
import LandlordDashboard from './pages/LandlordDashboard';

// This component handles simple state-based routing (no external router)
const AppCore = () => {
  // route.name must be one of the page component names
  const [route, setRoute] = useState({ name: 'HomePage' });

  const renderContent = () => {
    switch (route.name) {
      case 'HomePage':
        return <HomePage setRoute={setRoute} />;
      case 'SearchResultsPage':
        return <SearchResultsPage params={route.params} setRoute={setRoute} />;
      case 'PropertyDetailPage':
        return <PropertyDetailPage id={route.params.id} setRoute={setRoute} />;
      case 'LoginPage':
        return <LoginPage setRoute={setRoute} />;
      case 'SignupPage': // ✅ new case
        return <SignupPage setRoute={setRoute} />;
      case 'LandlordDashboard':
        return <LandlordDashboard />;
      default:
        return <HomePage setRoute={setRoute} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar setRoute={setRoute} />
      <main>{renderContent()}</main>
      <Footer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppCore />
  </AuthProvider>
);

export default App;
