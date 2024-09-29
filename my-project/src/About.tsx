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
    const [backgroundImage, setBackgroundImage] = useState(`src/assets/${Math.floor(Math.random() * 40)}.gif`);

    const changeBackgroundImage = () => {
        setBackgroundImage(`src/assets/${Math.floor(Math.random() * 40)}.gif`);
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
            desc: "Instantly view, copy, translate, summarize & download the YouTube video's transcript.",
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
                <Typewriter text=" How to use!" typingSpeed={200} />

                {/* Instructions */}
                <div className="mt-8 flex flex-col lg:flex-row justify-center gap-[3rem]">
                    {instructions.map((step, index) => (
                        <div key={index} className=" p-[2rem] max-w-[300px] flex flex-row lg:flex-col mt-4 text-white border border-white rounded-xl">
                            <h1 className="text-3xl font-bold ">{step.title}</h1>
                            <p className="text-lg mt-2">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
