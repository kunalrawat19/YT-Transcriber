import React from 'react';
import Navbar from './components/Navbar';
import { useState ,useEffect} from 'react';

const Instructions = () => {


    const [backgroundImage,setBackgroundImage]=useState<string>(`src/assets/${Math.floor(Math.random() * 40)}.gif`) // Specify loading state type

    const changeBackgroundImage=()=>{
    setBackgroundImage(`src/assets/${Math.floor(Math.random() * 40)}.gif`)

  }
  useEffect(() => {
    const interval = setInterval(changeBackgroundImage, 30000);

    // Call the function initially to set the first background
    changeBackgroundImage();

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full bg-repeat bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage:`url(${backgroundImage})` }}> 
      <div className="text-center flex relative justify-center items-center">
        <Navbar />
      </div> 



    </div>
    
    
  );
};

export default Instructions;
