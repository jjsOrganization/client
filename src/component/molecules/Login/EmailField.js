import React from 'react';
import Label from '../../atoms/Label.js';
import Input from '../../atoms/Input.js';

const EmailField = ({ value, onChange }) => (
  <div>
    <Label htmlFor="email" text="Email" className="block text-sm font-medium leading-6 text-gray-900" />
    <div className="mt-2">
      <Input
        id="email"
        type="email"
        value={value}
        onChange={onChange}
        placeholder="아이디를 입력해주세요."
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
);

export default EmailField;