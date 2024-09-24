import React from "react";

const Home = ({ type = "text", placeholder = "Enter text", value, onChange, className = "" }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 ${className}`}
    />
  );
};

export default Home;
