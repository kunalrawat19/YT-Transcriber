import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar=()=>{
    const active=true;
    const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);}

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
    return (
        <nav className="w-full  flex items-center justify-between p-[2rem]">
            <div>
            <Link to="/" className="text-5xl  text-white font-lines">Scriptify</Link>

            </div>



             {windowWidth>768?( <div className="flex gap-[2rem] font-lines">

            {/* <Link to="/about" className=" p-4  bg-white rounded-full  hover:text-blue-400">About</Link> */}
            <Link to="/about" className=" p-4 bg-white rounded-full  hover:text-blue-400">About</Link>
            <Link to="/register" className="p-4 bg-white t   rounded-full hover:text-blue-400">Register</Link>
            </div>
            ):(
            <div className="bg-white rounded-2xl  p-2 ">
                <button onClick={toggleMenu}>
                {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
            </div>
        )}


        {isOpen && windowWidth <= 768 && (
        <div className="absolute top-20 right-0 bg-white shadow-md rounded-lg p-4 mr-[1rem] mt-[0.5rem]">
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block p-2 hover:text-blue-400 border-solid font-lines"
          >
            About
          </Link>
          <Link
            to="/register"
            onClick={toggleMenu}
            className="block p-2 hover:text-blue-400 border-solid font-lines"
          >
            Register
          </Link>
        </div>
        )}
        </nav>
    )
}
export default Navbar;