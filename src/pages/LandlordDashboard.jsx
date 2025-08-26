import React from 'react';
import useAuth from '../hooks/useAuth';
import DashboardLayout from '../components/layout/DashboardLayout';

const LandlordDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      title={`Welcome to your Dashboard${user ? `, ${user.email}` : ''}`}
      actions={
        user && user.role !== 'Renter' ? (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">+ Add New Property</button>
        ) : null
      }
    >
      {user && user.role === 'Renter' ? (
        <div>
          <h2 className="text-2xl font-semibold">Your Favorite Properties</h2>
          <p className="mt-2 text-gray-600">This is where your saved listings would appear.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">Your Property Listings</h2>
          <p className="mt-2 text-gray-600">This is where you would manage your properties (create, edit, delete).</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default LandlordDashboard;
