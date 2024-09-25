import React from 'react';
import Navbar from './components/Navbar';
import { useState ,useEffect} from 'react';

const About = () => {

    const instructions=[{
      title:"Copy the YouTube URL",
      desc:"Copy the URL from the address bar of your web browser or right-click the video and select “Copy Video URL”"

    },{
      title:"Paste the URL above",
      desc:"Simply paste the copied YouTube video URL above and click “Get Video Transcript"
    },{
      title:"View the Youtube Transcript",
      desc:"Instantly view, copy and download the YouTube video's transcript text without entering your email."

    }]
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
    
        <Navbar/>
    <div className="h-[80vh] flex flex-col font-bold font-lines  bg-white w-[70%] rounded-2xl m-auto  p-4">
        <h1>designed to help me easily access, analyze, and manage transcripts from various sources, like YouTube videos or podcasts. It automatically generates transcripts from audio or video content, allowing me to search, highlight, and navigate through spoken words to extract key information quickly.</h1>
        <h1 className='text-3xl '>How to get the transcript of a YouTube video</h1>

        {instructions.map((step,index)=>
          <div><h1 className=''>{step.title}</h1>
        </div>)}

      
    </div>
    </div>
  );
};

export default About;
