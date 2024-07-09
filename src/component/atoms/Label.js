import React from 'react';

const Label = ({ htmlFor, text, className, style }) => (
  <label htmlFor={htmlFor} className={className} style={style}>
    {text}
  </label>
);

export default Label;