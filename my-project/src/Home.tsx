import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { YoutubeTranscript } from "youtube-transcript"; // Ensure you're importing this for type definitions

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [transcript, setTranscript] = useState<any[]>([]); // Use any[] or define a more specific type if known
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null
  const [loading, setLoading] = useState<boolean>(false); // Specify loading state type

  const fetchTranscript = async (videoId: string) => {
    setLoading(true);
    setError(null); // Reset error state before a new fetch

    // Extract video ID if URL is provided
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = videoId.match(urlPattern);
    const extractedId = match ? match[1] : videoId;

    try {
      // Call your proxy server
      const response = await fetch(`http://localhost:3000/fetch-transcript?videoId=${extractedId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const transcriptData = await response.json();
      console.log("Transcript: ", transcriptData);
      setTranscript(transcriptData); // Set the transcript data in state
    } catch (error) {
      console.error('Error fetching transcript:', error.message);
      setError("Error fetching transcript. Please check the video ID."); // Now this will be correctly typed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="h-screen w-full bg-repeat bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${`src/assets/${Math.floor(Math.random() * 40)}.gif`})` }}> 
      <div className="text-center flex relative justify-center items-center">
        <Navbar />
      </div> 
    
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter YouTube video URL or ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border min-w-[400px] rounded-full w-[40vw] px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button 
          onClick={() => fetchTranscript(videoId)} // Call fetchTranscript on click
          className="ml-4 px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-700 transition-colors">
          Get Transcript
        </button>
      </div>
      
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {transcript.length > 0 && (
        <ul className="mt-4">
          {transcript.map((line, index) => (
            <li key={index}>{line.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
