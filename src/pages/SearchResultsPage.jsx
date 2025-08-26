import React, { useEffect, useState } from 'react';
import { api } from '../api';
import PropertyCard from '../components/compound/PropertyCard';
import SearchBar from '../components/compound/SearchBar';

const SearchResultsPage = ({ params = {}, setRoute }) => {
  const [results, setResults] = useState(null);

  const runSearch = async (p) => {
    const data = await api.searchProperties(p || params);
    setResults(data);
  };

  useEffect(() => {
    runSearch(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (p) => {
    runSearch(p);
  };

  if (!results) return <div className="text-center p-10">Searching...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => setRoute({ name: 'HomePage' })} className="mb-6 text-indigo-600 hover:underline">
        &larr; Back to Home
      </button>

      <div className="mb-6">
        <SearchBar onSearch={onSearch} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {results.length} result{results.length !== 1 ? 's' : ''} found
      </h2>

      {results.length === 0 ? (
        <div className="text-gray-600">No matches. Try widening your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((prop) => (
            <PropertyCard key={prop._id} property={prop} setRoute={setRoute} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
