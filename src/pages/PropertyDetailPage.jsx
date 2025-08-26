import React, { useEffect, useState } from 'react';
import { api } from '../api';

const PropertyDetailPage = ({ id, setRoute }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading property details...</div>;
  if (!property) return <div className="text-center p-10">Property not found.</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => setRoute({ name: 'HomePage' })} className="mb-6 text-indigo-600 hover:underline">
        &larr; Back to Listings
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <img className="h-96 w-full object-cover" src={property.images[0]} alt="Main view of property" />
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{property.address.street}</h1>
              <p className="text-xl text-gray-600">
                {property.address.city}, {property.address.state} {property.address.zipCode}
              </p>
            </div>
            <div className="text-4xl font-bold text-indigo-600">
              ${property.price.toLocaleString()}
              <span className="text-lg font-normal text-gray-600">/month</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-b border-gray-200 py-4">
            <span className="text-lg">{property.bedrooms} Bedrooms</span>
            <span className="text-lg">{property.bathrooms} Bathrooms</span>
            <span className="text-lg">{property.propertyType}</span>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
            <p className="mt-2 text-gray-600">{property.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Amenities</h2>
            <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600">
              {property.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Landlord</h2>
            <p className="text-gray-600">Interested? Send an inquiry to {property.landlord.email}</p>
            <button className="mt-4 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors">
              Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
