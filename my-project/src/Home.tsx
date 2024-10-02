import React, { useState, useEffect } from "react";
import Navbar from "/src/components/Navbar.tsx";

import axios from "axios";
import translate from "translate";

import { MdDownload } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";

const Home: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [extractedId,setExtractedId]=useState('');

  const [transcript, setTranscript] = useState<any[]>([]);
  const[transcriptCopy,setTranscriptCopy]=useState<any[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [backgroundImage, setBackgroundImage] = useState<string>(`src/assets/${Math.floor(Math.random() * 40)}.gif`);
  
  const [targetLanguage, setTargetLanguage] = useState('en');

  const backgroundImages = [
    { id: 1, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698053/Zombies_vwgwnp.gif" },
    { id: 2, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698048/tumblr_om1h9bsPn41vjxiz1o1_540_gif_512_312_zyiknt.gif" },
    { id: 3, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698045/tumblr_ogr2nbDXq11rkmjxwo1_500_gif_500_270_r3kj2x.gif" },
    { id: 4, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698039/Tired_Now_hcrsda.gif" },
    { id: 5, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698037/Steam_Community____VA-11_Hall-A__Cyberpunk_Bartender_Action_aitjjo.gif" },
    { id: 6, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698029/Spirited_Away_gif_sb08sh.gif" },
    { id: 7, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698024/Smoking_Joe_s_xp1bwq.gif" },
    { id: 8, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698019/Sex_Lessons_aalimq.gif" },
    { id: 9, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698016/Robo_Trip_q69ucw.gif" },
    { id: 10, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698011/Pixel_Jeff_X_Divoom_kuzmt9.gif" },
    { id: 11, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698008/Night_Shift_Pixel_Jeff_bk7ucu.gif" },
    { id: 12, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727698003/%E1%B4%8D%E1%B4%80%C9%B4%E1%B4%85%CA%8F_%CA%99%E1%B4%9C%C9%B4%C9%B4%CA%8F_ylrsvo.gif" },
    { id: 13, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697999/Modern_bathroom_design_by_Cutiezor_on_DeviantArt_lkkwr1.gif" },
    { id: 14, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697995/In_the_shelves_pixel_art_vfzeue.gif" },
    { id: 15, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697987/Happy_rover_pqpbsd.gif" },
    { id: 16, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697979/Gamer_Room__Cyberpunk_ExceptRea_ewunud.gif" },
    { id: 17, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697971/gif_jbrhsm.gif" },
    { id: 18, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697958/dd12c41d-464d-48d0-b8dc-3eba590f4ae3_g3ea4v.gif" },
    { id: 19, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697955/Create_dynamic_edits_curate_your_gallery_and_immerse_yourself_in_inspiring_and_motivating_content__ynlfpu.gif" },
    { id: 20, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697944/Chill_of_the_Wild_fjrfmh.gif" },
    { id: 21, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697938/Chill_Mario_2023_ver__Pixel_Jeff_uhur73.gif" },
    { id: 22, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697933/c9d73577-e540-403e-8dcd-4eb9302d77a1_riqr97.gif" },
    { id: 23, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697931/APO___%E7%94%BB%E5%83%8F_srztlt.gif" },
    { id: 24, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697918/86e705d1-f73f-4f4d-a602-9be3b09573b0_jncxru.gif" },
    { id: 25, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697909/77af265e-ef54-4718-b154-5a9dbe7966fd_mnwob1.gif" },
    { id: 26, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697905/11_h0xgd2.gif" },
    { id: 27, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697903/9_sjiuag.gif" },
    { id: 28, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697901/8_ziinfx.gif" },
    { id: 29, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697893/7_r2pypm.gif" },
    { id: 30, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697891/photo_vassoula_mpsdme.gif" },
    { id: 31, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697887/__zlvnmn.gif" },
    { id: 32, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697884/__11_e5bt8k.gif" },
    { id: 33, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697876/__10_vsz6hp.gif" },
    { id: 34, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697865/__9_j5dh2x.gif" },
    { id: 35, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697861/__8_i80ctk.gif" },
    { id: 36, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697856/__7_oywulw.gif" },
    { id: 37, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697854/__6_sipdgy.gif" },
    { id: 38, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697852/__5_ilndix.gif" },
    { id: 39, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697832/__4_nbfcd4.gif" },
    { id: 40, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727697830/__3_rreglv.gif" },
    { id: 41, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727266577/__2_h6nzjt.gif" },
    { id: 42, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700655/happy_life_GIF_-_Find_Share_on_GIPHY_dzhwka.gif" },
    { id: 43, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700648/latenights_xjsgql.gif" },
    { id: 44, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727713060/Megalo_Box_furdhn.gif" },
    { id: 45, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700634/happy_life_GIF_-_Find_Share_on_GIPHY_hvx4ko.gif" },
    {id:46,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700629/a4l8vys2griy_gif_960_540_jtfj56.gif"},
    {id:47,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700619/7he_R4_q8rwhz.gif"},
    {id:48,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700618/__mmkarv.gif"},
    {id:49,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700617/__2_kezjoi.gif"},
    {id:50,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700613/__1_m0dj2l.gif"}
    
  
  
  ];

  
  const changeBackgroundImage = () => {
    setBackgroundImage(backgroundImages[Math.floor(Math.random() * 50)].link);
  };

  translate.engine = "google"; 

  useEffect(() => {
    const interval = setInterval(changeBackgroundImage, 30000);
    changeBackgroundImage();

    return () => clearInterval(interval);
  }, []);

  const downloadTranscript = (transcript) => {
    const formattedData = transcriptCopy.map(item => 
      ` ${Math.floor(item.offset / 3600) < 10 ? '0' + Math.floor(item.offset / 3600) : Math.floor(item.offset / 3600)}:${Math.floor((item.offset % 3600) / 60) < 10 ? '0' + Math.floor((item.offset % 3600) / 60) : Math.floor((item.offset % 3600) / 60)}:${Math.floor(item.offset % 60) < 10 ? '0' + Math.floor(item.offset % 60) : Math.floor(item.offset % 60)}-- ${item.text}`
    ).join('\n');
    const blob = new Blob([formattedData], { type: 'text/plain' });
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
    setExtractedId(match ? match[1] : videoId);

    try {
      const response = await fetch(`https://scriptifyy.vercel.app/api/fetch-transcript?videoId=${extractedId}`)
      if (!response.ok) throw new Error('Network response was not ok');
      let transcriptData = await response.json();

      

      

      setTranscript(transcriptData);
      // console.log(formattedData)
      setTranscriptCopy(transcriptData);


      
      
    } catch (error) {
      // console.error('Error fetching transcript:', error.message);
      setError("Error fetching transcript. Please check the video ID and try again.");
    } finally {
      // handleTranslate();
      setLoading(false);
      setError(null)
    }
  };

  function downloadTrans(){
    downloadTranscript(JSON.stringify(transcript));
  }

  interface TranscriptLine {
    text: string;
    offset: number;
  }

  const handleTranslate = async () => {
    let translatedText: TranscriptLine[] = [];
  
    try {
      // Use Promise.all to handle translations concurrently
      translatedText = await Promise.all(
        transcript.map(async (line) => {
          const translatedText = await translate(line.text, { to: targetLanguage });
          return {
            text: translatedText,
            offset: line.offset,
          };
        })
      );
  
      
      setTranscriptCopy(translatedText)
    } catch (error) {
      console.error("Translation Error:", error);
    }
  };

  useEffect(() => {
    if (transcriptCopy) {
      handleTranslate();
    }
  }, [targetLanguage]);
  

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(transcript))
      .then(() => {
        alert('Copied to clipboard!'); // Feedback to the user (can be improved)
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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

      <div className="relative flex flex-col items-center mx-auto md:flex-row md:items-center justify-center  mt-[2rem] lg:mt-[4rem] m-auto">
        <input
          type="text"
          placeholder="Enter YouTube video URL or ID"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="border min-w-[400px] rounded-full w-[40vw] px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <div className="flex-row gap-[4rem] mt-[2rem] md:ml-4 md:m-0">

          <button
            onClick={() => fetchTranscript(videoId)}
            className="px-6 py-2 rounded-full bg-white font-lines hover:text-blue-400 transition-colors"
          >
            Get Transcript
          </button>
         
          <div className="ml-4 px-6 py-2 pr-10 font-lines relative inline-block text-center bg-white rounded-full  hover:text-blue-400">
          <select
            className="  appearance-none transition-colors block w-full focus:outline-none focus:ring-0"
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
          <FaChevronDown className="absolute inset-y-0 right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400" />
          {/* Custom icon positioned absolutely */}
          </div>


        </div>
      </div>

      <div className="relative w-[80%] m-auto text-center mb-12">
     {loading && <div className="font-lines text-2xl">Loading...</div>}
     {error && <p className="text-red-500">{error}</p>}
  {transcriptCopy.length > 0 && (
    <div className="flex md:flex-row mt-[3rem] md:gap-[4rem] flex-col gap-[4rem]">
      
      {/* YouTube iframe */}
      <iframe  
        className="md:block hidden"
        width="560" 
        height="315" 
        src={`https://www.youtube.com/embed/${extractedId}`} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
      
      {/* Transcript Section */}
      <div className=" w-[50%] min-w-[300px] text-left h-[315px] overflow-y-auto m-auto p-0 bg-white border border-gray-300 rounded-lg ">
        {/* Fixed Navbar */}
        <div className=" sticky top-0  z-10 border-b border-gray-300 bg-white p-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="font-bold text-2xl">Transcript</div>
            <div className="flex flex-row gap-[1rem] ">

            <button className="text-blue-500 font-bold text-2xl border rounded-xl p-2" onClick={downloadTrans}>
            <MdDownload />

            </button>
            <button className="text-blue-500 font-bold text-xl border rounded-xl p-3 " onClick={handleCopy} >
              <LuCopy />
            </button>
            </div>
          </div>
        </div>

        {/* Content with top padding */}
        <div className=" pt-0 p-4"> {/* Adjust padding to match navbar height */}
          {transcriptCopy.map((line, index) => (
            <p key={index} className="text-xl p-2 ">
              {Math.floor(line.offset / 3600) < 10 ? '0' + Math.floor(line.offset / 3600) : Math.floor(line.offset / 3600)}:
              {Math.floor((line.offset % 3600) / 60) < 10 ? '0' + Math.floor((line.offset % 3600) / 60) : Math.floor((line.offset % 3600) / 60)}:
              {Math.floor(line.offset % 60) < 10 ? '0' + Math.floor(line.offset % 60) : Math.floor(line.offset % 60)} 
              - {(line.text).replace(/&amp;#39;/g, "'")}
            </p>
          ))}
        </div>
      </div>
      
    </div>
  )}
</div>

</div>



      
  );
};

export default Home;
