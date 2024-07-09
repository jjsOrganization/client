import React from 'react';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';

const FormField = ({ label, type, name, value, onChange, placeholder, className }) => (
  <div className = {className}>
    <Label 
      htmlFor={name} 
      text={label} 
      style={{ fontWeight: 'bold' }}
    />
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default FormField;