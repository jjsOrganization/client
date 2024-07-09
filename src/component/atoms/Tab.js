import React from 'react';

const Tab = ({ active, label, onClick }) => (
  <li className={`tab ${active ? 'active' : ''}`} onClick={onClick}>
    <span className="SignUp4">{label}</span>
  </li>
);

export default Tab;