import React from "react";

function Input({ label, name, value, onChange, placeholder }) {
  return (
    <div className={`${name}Field`}>
      <label>
        <span>{label}</span>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}

export default Input;