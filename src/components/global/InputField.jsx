
import React from 'react';

const InputField = ({ label, id, className = '', ...rest }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={
          'block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 ' +
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 ' +
          className
        }
        {...rest}
      />
    </div>
  );
};

export default InputField;
