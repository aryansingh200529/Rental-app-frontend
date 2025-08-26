
import React from 'react';

const DashboardLayout = ({ title, actions, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">{children}</div>
    </div>
  );
};

export default DashboardLayout;
