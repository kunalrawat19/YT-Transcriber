import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { YoutubeTranscript } from "youtube-transcript";
import About from "./About"; // Ensure you're importing this for type definitions
import { useEffect } from "react";


const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [transcript, setTranscript] = useState<any[]>([]); // Use any[] or define a more specific type if known
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage,setBackgroundImage]=useState<string>(`src/assets/${Math.floor(Math.random() * 40)}.gif`) // Specify loading state type

  const changeBackgroundImage=()=>{
    setBackgroundImage(`src/assets/${Math.floor(Math.random() * 45)}.gif`)

  }
  useEffect(() => {
    const interval = setInterval(changeBackgroundImage, 30000);

    // Call the function initially to set the first background
    changeBackgroundImage();

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const downloadTranscript=(transcript)=>{
    

      // Create a Blob with the text content
      const blob = new Blob([transcript], { type: 'text/plain' });

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${videoId}.txt`; // Filename for the downloaded file

      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);

      // Trigger the download by simulating a click on the link
      link.click();
  }

  const fetchTranscript = async (videoId: string) => {
    setLoading(true);
    setError(null); // Reset error state before a new fetch

    // Extract video ID if URL is provided
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = videoId.match(urlPattern);
    const extractedId = match ? match[1] : videoId;


    try {
      // const videoDetails = await fetch(`/video-info?videoId=${videoId}`);
      // console.log(videoDetails)
      // const data = await videoDetails.json();
      // console.log('Title:', data.title);

      
      
      // Call your proxy server
      const response = await fetch(`http://localhost:3000/fetch-transcript?videoId=${extractedId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const transcriptData = await response.json();
      // console.log("Transcript: ", transcriptData);
      setTranscript(transcriptData);
      downloadTranscript(JSON.stringify(transcript)) // Set the transcript data in state
    } catch (error) {
      console.error('Error fetching transcript:', error.message);
      setError("Error fetching transcript. Please check the video ID."); // Now this will be correctly typed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="h-screen w-full bg-repeat bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage:`url(${backgroundImage})` }}> 
      <div className="text-center flex relative justify-center items-center">
        <Navbar />
      </div> 
      {/* <div className="flex justify-center ">

      <h1 className="font-maps text-6xl text-white">Free YouTube Transcript Generator</h1>
      </div> */}
    
      <div className="flex flex-col md:flex-row md:items-center justify-center mt-[6rem] top-[50%]  m-auto ">
        <input
          type="text"
          placeholder="Enter YouTube video URL or ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border min-w-[400px] rounded-full w-[40vw] px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => fetchTranscript(videoId)} // Call fetchTranscript on click
          className="ml-4 px-6 py-2 inline-block max-w-[200px] rounded-full bg-white font-lines hover:bg-blue-700 transition-colors">
          Get Transcript
        </button>
      </div>
      





      <div className="w-[80%] m-auto text-center mb-[3rem]">

      {loading && <div className="font-lines text-2xl m-auto mt-[4rem] inline-block">Loading <img src="https://res.cloudinary.com/ddsqjzrow/image/upload/v1727269500/loading_pd3k3h.png" alt="" className="w-[15px] h-[15px]" /></div>}
      {error && <p className="text-red-500">{error}</p>}
      {transcript.length > 0 && (
        <>
        {/* <iframe width="560" height="315" 
src={`https://www.youtube-nocookie.com/embed/${videoId}`}
title="YouTube video player"  
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
</iframe> */}
        <div className=" w-[50%] min-w-[400px]  mt-[3rem] h-64 overflow-y-auto m-auto  p-4 border bg-white border-gray-300 rounded-lg">
          <div className="space-y-4 text-left">
          {transcript.map((line, index) => (
            <p className="  " key={index}>
              
              {Math.floor(line.offset/ 3600) < 10 ? `0${Math.floor(line.offset/ 3600)}` :Math.floor(line.offset/ 3600)}:{Math.floor(line.offset% 3600)/60 < 10 ? `0${Math.floor((line.offset% 3600)/60)}` :Math.floor((line.offset% 3600)/60)}:{Math.floor(line.offset%60) < 10 ? `0${Math.floor(line.offset% 60)}` :Math.floor(line.offset% 60)}
              -{(line.text).replace(/&amp;#39;/g, "'")}</p>
          ))}
        </div>
        </div>
          </>
      )}
      </div>
    
    </div>
  );
};

export default Home;
