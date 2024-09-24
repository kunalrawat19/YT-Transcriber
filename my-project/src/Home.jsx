import React from "react";
import Navbar from "./components/Navbar"

const Home = ({ 
  type = "text", placeholder = "Enter text", value, onChange, className = "" }) => {
  return (
    <>
    <Navbar/>
    <div className="text-center">

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-full w-[40vw] px-4 py-2 focus:outline-none focus:border-blue-500 ${className}`}
      />
      </div>
      </>
  );
};

export default Home;
