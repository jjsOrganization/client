import React from 'react';

const Input = ({ id, type, value, onChange, placeholder, className, name }) => (
  <input
    id={id}
    name = {name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
  />
);

export default Input;