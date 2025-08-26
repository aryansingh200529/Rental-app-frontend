
import React from 'react';

const Button = ({ as = 'button', className = '', children, ...rest }) => {
  const Component = as;
  return (
    <Component
      className={
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ' +
        'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ' +
        className
      }
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Button;
