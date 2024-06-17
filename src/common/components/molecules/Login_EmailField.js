import React from 'react';
import Label from '../atoms/Login_Label.js';
import Input from '../atoms/Login_Input.js';

const EmailField = ({ value, onChange }) => (
  <div>
    <Label htmlFor="email" text="Email" className="text-gray-900" />
    <div className="mt-2">
      <Input
        id="email"
        type="email"
        value={value}
        onChange={onChange}
        placeholder="Enter your email"
        className="bg-gray-100"
      />
    </div>
  </div>
);

export default EmailField;