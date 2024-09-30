import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';


const Typewriter = ({ text, typingSpeed = 100 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        let timeoutId;

        const type = () => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
                timeoutId = setTimeout(type, typingSpeed);
            }
        };

        setDisplayedText(''); // Reset displayed text on re-render
        type(); // Start typing

        return () => clearTimeout(timeoutId); // Clean up
    }, [text, typingSpeed]);

    return (
        <div>
            <h1 className='text-6xl md:text-8xl lg:text-9xl font-lines text-white font-bold'>
                {displayedText}
                <span className="border-r-2 border-orange-500 animate-blink-caret"></span>
            </h1>
        </div>
    );
};

const About = () => {
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
        { id: 44, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700639/fb95727b-2d01-4cdb-aea1-7accad04945f_is5m8h.jpg" },
        { id: 45, link: "https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700634/happy_life_GIF_-_Find_Share_on_GIPHY_hvx4ko.gif" },
        {id:46,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700629/a4l8vys2griy_gif_960_540_jtfj56.gif"},
        {id:47,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700619/7he_R4_q8rwhz.gif"},
        {id:48,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700618/__mmkarv.gif"},
        {id:49,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700617/__2_kezjoi.gif"},
        {id:50,link:"https://res.cloudinary.com/dqgrwjod2/image/upload/v1727700613/__1_m0dj2l.gif"}
        
      
      
      ];
      
    const [backgroundImage, setBackgroundImage] = useState(backgroundImages[Math.floor(Math.random() * 50)].link);

    const changeBackgroundImage = () => {
        setBackgroundImage(backgroundImages[Math.floor(Math.random() * 50)].link);
    };

    useEffect(() => {
        const interval = setInterval(changeBackgroundImage, 30000);
        changeBackgroundImage(); // Call the function initially

        return () => clearInterval(interval);
    }, []);

    const instructions = [
        {
            title: "Copy the YouTube URL",
            desc: "Copy the URL from the address bar of your YouTube video",
        },
        {
            title: "Paste the URL above",
            desc: "Simply paste the copied YouTube video URL above and click 'Fetch Transcript'.",
        },
        {
            title: "View the YouTube Transcript",
            desc: "Now you can view, copy, translate, summarize & download the YouTube video's transcript.",
        },
    ];

    return (
        <div className="relative h-screen w-full bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-75"></div>

            {/* Navbar */}
            <div className="text-center flex relative justify-center items-center">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-[80%] m-auto">
                <Typewriter text=" How to use?" typingSpeed={200} />

                {/* Instructions */}
                <div className="mt-8 m-auto flex flex-col   lg:flex-row justify-center gap-[3rem]">
                    {instructions.map((step, index) => (
                        <div key={index} className=" max-w-[300px] flex flex-row lg:flex-col mt-4 border border-white rounded-xl">
                            
                            <div className='p-[2rem] bg-white rounded-xl h-[50%]'>

                            <h1 className="text-3xl  font-bold ">{step.title}</h1>
                            </div>
                            <div className='p-[1rem]'>

                            <p className=" hidden lg:block text-lg mt-2  text-white w-[90%]">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
