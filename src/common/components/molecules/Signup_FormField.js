import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="SignUp2">
    <Label htmlFor={name} text={label} className="SignUp3" />
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