// src/components/compound/SearchBar.jsx
import React, { useState } from 'react';
import InputField from '../global/InputField';
import Button from '../global/Button';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [beds, setBeds] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onSearch({
      query,
      city: city || undefined,
      type: type || undefined,
      beds: beds ? Number(beds) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-6 gap-3">
      <InputField
        id="q"
        placeholder="Search by street, city or description"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="md:col-span-2"
      />
      <InputField id="city" placeholder="City (optional)" value={city} onChange={(e) => setCity(e.target.value)} />
      <select
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Type</option>
        <option>Apartment</option>
        <option>House</option>
        <option>Condo</option>
        <option>Townhouse</option>
      </select>
      <InputField
        id="beds"
        type="number"
        min="0"
        placeholder="Min Beds"
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          id="minPrice"
          type="number"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <InputField
          id="maxPrice"
          type="number"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <Button type="submit" className="md:col-span-1">Search</Button>
    </form>
  );
};

export default SearchBar;
