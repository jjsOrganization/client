import React from 'react';

const Label = ({ htmlFor, text, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium leading-6 text-gray-900 ${className}`}>
    {text}
  </label>
);

export default Label;