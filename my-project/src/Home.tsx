import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { YoutubeTranscript } from "youtube-transcript";
import About from "./About"; // Ensure you're importing this for type definitions
import { useEffect } from "react";
import axios from 'axios';

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [transcript, setTranscript] = useState<any[]>([]); // Use any[] or define a more specific type if known
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage,setBackgroundImage]=useState<string>(`src/assets/${Math.floor(Math.random() * 40)}.gif`) // Specify loading state type
  const [translatedText, setTranslatedText] = useState<string>("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('it'); // Default target language is Italian

  const translateText = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Extract the text from the transcript and join into a single string
      const transcriptText = transcript.map(line => line.text).join(" ");
      
      // Function to chunk text
      const chunkText = (text: string, chunkSize: number) => {
        const chunks: string[] = [];
        for (let i = 0; i < text.length; i += chunkSize) {
          chunks.push(text.slice(i, i + chunkSize));
        }
        return chunks;
      };
  
      // Split the transcript text into chunks of 500 characters
      const chunks = chunkText(transcriptText, 500);
      const translatedChunks: string[] = [];
  
      // Send translation requests for each chunk
      for (const chunk of chunks) {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
          params: {
            q: chunk,
            langpair: `en|${targetLanguage}`,
          },
        });
  
        if (response.data.responseStatus === 200) {
          console.log(response.data.responseData.translatedText);
          translatedChunks.push(response.data.responseData.translatedText);
          
        } else {
          setError('Translation failed for one of the chunks.');
          return; // Exit if translation fails
        }
      }
  
      // Combine the translated chunks into one string
      setTranslatedText(translatedChunks.join(" "));
      
    } catch (err) {
      setError('Error fetching translation');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  


  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };
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
    
      JSON.stringify(transcript)
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
  function downloadTrans(){
    downloadTranscript(JSON.stringify(transcript));
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
    } catch (error) {
      console.error('Error fetching transcript:', error.message);
      setError("Error fetching transcript. Please check the video ID."); // Now this will be correctly typed
    } finally {
      setLoading(false); // Reset loading state
    }

    
  };

  return (
    <div className="overflow-y-auto h-screen w-full bg-repeat bg-cover bg-center transition-all duration-1000"
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


        <div className="ml-[2rem] flex-row gap-3" >
        <label htmlFor="language-select" className="font-lines text-white ">Select Language</label>
        <select id="language-select" value={targetLanguage} onChange={handleLanguageChange} >
            <option value="it">Italian</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="ru">Russian</option>
            <option value="en">English</option>
        {/* Add more languages as needed */}
      </select>
      <br />
      
      <button 
        onClick={translateText} 
        className= "ml-8 mt-2 bg-white font-lines px-6 py-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Translate
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
      </div>
      





      <div className="w-[80%] m-auto text-center mb-[1rem]">

      {loading && <div className="font-lines text-2xl m-auto mt-[4rem] inline-block">Loading <img src="https://res.cloudinary.com/ddsqjzrow/image/upload/v1727269500/loading_pd3k3h.png" alt="" className="w-[15px] h-[15px]" /></div>}
      {error && <p className="text-red-500">{error}</p>}
      {transcript.length > 0 && (
        <div className="w-[40%] mt-[3rem] h-64 overflow-y-auto m-auto  p-4 border bg-white border-gray-300 rounded-lg">
          <div className="space-y-4">
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


      <div className="w-[80%] m-auto text-center mb-[5rem] mt-0">
        {transcript.length > 0 && (
          <div className="flex justify-center space-x-4 mt-0"> {/* Center the buttons with spacing */}
            <button className="px-6 py-2 rounded-full bg-white  font-lines hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 " onClick={downloadTrans}>
              Download
            </button>
            <button className="px-6 py-2 rounded-full bg-white font-lines hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Summarize
            </button>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default Home;
