import React from "react";
import Label from "../../atoms/Label.js";
import Input from "../../atoms/Input.js";

const PasswordField = ({ value, onChange }) => (
  <div>
    <Label
      htmlFor="password"
      text="Password"
      className="block text-sm font-medium leading-6 text-gray-900"
    />
    <div className="mt-2">
      <Input
        id="password"
        type="password"
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        style={{
          borderRadius: "0.4rem",
          backgroundColor: "#F3F4F6",
        }}
      />
    </div>
  </div>
);

export default PasswordField;
