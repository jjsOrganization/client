import React from 'react';
import Label from '../atoms/Login_Label.js';
import Input from '../atoms/Login_Input.js';

const PasswordField = ({ value, onChange }) => (
  <div>
    <Label htmlFor="password" text="Password" className="text-gray-900" />
    <div className="mt-2">
      <Input
        id="password"
        type="password"
        value={value}
        onChange={onChange}
        placeholder="Enter your password"
        className="bg-gray-100"
      />
    </div>
  </div>
);

export default PasswordField;