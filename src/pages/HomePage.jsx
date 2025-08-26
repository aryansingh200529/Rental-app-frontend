import React, { useEffect, useState } from 'react';
import { api } from '../api';
import PropertyCard from '../components/compound/PropertyCard';

const HomePage = ({ setRoute }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
    
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = await api.getProperties();
      setProperties(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 lg:px-8 py-16 sm:py-24">
       
        <div className="text-center mb-16">
        
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Find Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Perfect Home
            </span>
          </h1>
      
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Discover a curated selection of properties and find the one that you can call home.
          </p>
        </div>

       
        {properties.length > 0 ? (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} setRoute={setRoute} />
            ))}
          </div>
        ) : (
         
          <div className="text-center mt-20">
        
            <svg
              className="mx-auto h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-slate-800">No properties found</h3>
            <p className="mt-1 text-base text-slate-500">
              There are no properties available right now. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;