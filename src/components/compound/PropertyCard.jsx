// src/components/compound/PropertyCard.jsx
import React from 'react';

const PropertyCard = ({ property, setRoute }) => {
  return (
    // The main container with refined shadows and transitions for a premium feel
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-slate-100 transform hover:-translate-y-1">
      {/* Image container with a favorite button overlay */}
      <div className="relative">
        <img
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={property.images[0] || 'https://placehold.co/600x400/e2e8f0/475569?text=No+Image'}
          alt={`View of ${property.address.street}`}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/475569?text=No+Image'; }}
        />
        {/* Favorite button with a modern glassmorphism effect */}
        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-red-500 hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>

      {/* Content Area uses flex-col to structure its children */}
      <div className="p-5 flex flex-col">
        {/* Price and Address Section */}
        <div>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-extrabold text-slate-900">
              ${property.price.toLocaleString()}
            </h3>
            <span className="ml-1.5 text-sm font-medium text-slate-500">/month</span>
          </div>
          <p className="text-slate-700 mt-1.5 font-semibold truncate" title={`${property.address.street}, ${property.address.city}`}>
            {property.address.street}, {property.address.city}
          </p>
        </div>

        {/* Bed & Bath Details Section */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-slate-600">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="text-sm font-medium">{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0h-2" />
            </svg>
            <span className="text-sm font-medium">{property.bathrooms} baths</span>
          </div>
          {/* A third detail like square footage could be added here */}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => setRoute({ name: 'PropertyDetailPage', params: { id: property._id } })}
          className="mt-5 w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
