import React from "react";
import {Link} from "react-router-dom"

const Navbar=()=>{
    
    return (
        <div className="w-full  flex items-center justify-between p-[2rem]">
            <div>
            <Link to="/" className="text-5xl  text-white font-lines">Scriptify</Link>

            </div>

            <div className="flex gap-[2rem] font-lines">

            <Link to="/about" className=" p-4  bg-white rounded-full  hover:text-blue-400">About</Link>
            <Link to="/instructions" className=" p-4 bg-white rounded-full  hover:text-blue-400">How to use</Link>
            <Link to="/register" className="p-4 bg-white t   rounded-full hover:text-blue-400">Register</Link>
            </div>


            
        
        
        
        
        
        
        
        
        
        </div>

    )
}
export default Navbar;