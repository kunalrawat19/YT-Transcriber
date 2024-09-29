import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [transcript, setTranscript] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<string>(`src/assets/${Math.floor(Math.random() * 40)}.gif`);
  const [targetLanguage, setTargetLanguage] = useState('it');

  const changeBackgroundImage = () => {
    setBackgroundImage(`src/assets/${Math.floor(Math.random() * 45)}.gif`);
  };

  useEffect(() => {
    const interval = setInterval(changeBackgroundImage, 30000);
    changeBackgroundImage();

    return () => clearInterval(interval);
  }, []);

  const downloadTranscript = (transcript) => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${videoId}.txt`;
    document.body.appendChild(link);
    link.click();
  };

  const fetchTranscript = async (videoId: string) => {
    setLoading(true);
    setError(null);

    const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = videoId.match(urlPattern);
    const extractedId = match ? match[1] : videoId;

    try {
      const response = await fetch(`http://localhost:3000/fetch-transcript?videoId=${extractedId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const transcriptData = await response.json();
      setTranscript(transcriptData);

      const translationPromises = transcriptData.map(async (item) => {
        const response = await axios.get('https://api.mymemory.translated.net/get', {
          params: {
            q: item.text,  // The text to be translated
            langpair: `en|${targetLanguage}`,  // Language pair (from English to the target language)
          },
        });
        
        // Return the updated transcript object with the translated text
        return {
          ...item,
          text: response.data.responseData.translatedText, // Update with translated text
        };
      });
    
      // Wait for all translation promises to resolve
      const translatedTranscriptData = await Promise.all(translationPromises);
    
      // Now `translatedTranscriptData` contains the fully translated transcript
      setTranscript(translatedTranscriptData); // Update the state wi
      console.log(transcript)
      downloadTranscript(JSON.stringify(transcriptData));
    } catch (error) {
      console.error('Error fetching transcript:', error.message);
      setError("Error fetching transcript. Please check the video ID.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className="relative h-screen w-full bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative text-center flex justify-center items-center">
        <Navbar />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-center justify-center mt-24 m-auto">
        <input
          type="text"
          placeholder="Enter YouTube video URL or ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border min-w-[400px] rounded-full w-[40vw] px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => fetchTranscript(videoId)}
          className="ml-4 px-6 py-2 rounded-full bg-white font-lines hover:text-blue-400 transition-colors"
        >
          Get Transcript
        </button>
        <select
          className="ml-4 px-6 py-2 rounded-full bg-white font-lines hover:text-blue-400 transition-colors"
          value={targetLanguage}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="it">Italian</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          <option value="ru">Russian</option>
        </select>
      </div>

      <div className="relative w-[80%] m-auto text-center mb-12">
        {loading && <div className="font-lines text-2xl">Loading...</div>}
        {error && <p className="text-red-500">{error}</p>}
        {transcript.length > 0 && (
          <div className="w-[50%] min-w-[400px] mt-12 h-64 overflow-y-auto m-auto p-4 bg-white border border-gray-300 rounded-lg">
            {transcript.map((line, index) => (
              <p key={index}>
                {Math.floor(line.offset / 3600)}:{Math.floor((line.offset % 3600) / 60)}:{Math.floor(line.offset % 60)} - {line.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
