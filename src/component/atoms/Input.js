import React from "react";

const Input = ({ id, type, value, onChange, placeholder, className, name, style }) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={className}
    style={style}
  />
);

export default Input;
