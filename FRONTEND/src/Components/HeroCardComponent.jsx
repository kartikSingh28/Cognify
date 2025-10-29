import React, { useState, useEffect } from "react";
import logo from "../assets/LOGO.png";
import pic1 from "../assets/img1.png";
import pic2 from "../assets/img2.png";
import pic3 from "../assets/img3.png";
import pic4 from "../assets/img4.png";

export function HeroCard() {
  const slides = [
    {
      img: pic1,
      quote: "Every memory is a bridge to moments that made us smile.",
    },
    {
      img: pic2,
      quote: "The heart remembers what the mind forgets.",
    },
    {
      img: pic3,
      quote: "Small moments make big memories.",
    },
    {
      img: pic4,
      quote: "Cherish today, for tomorrow it becomes a memory.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#E8F6F3] to-[#F2F7F5] overflow-hidden pt-28 pb-10 px-4">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-cognify-teal/15 blur-3xl rounded-full pointer-events-none"></div>

      {/* Heading and Subtext */}
      <div className="relative z-10 text-center max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-cognify-dark mb-4">
          Remember Moments. Relive Feelings.
        </h1>
        <p className="text-lg md:text-xl text-cognify-dark/70 leading-relaxed">
          Cognify helps you reconnect with the emotions behind every memory — 
          preserving stories that define who we are and the people we love.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between bg-[#FFFFFFE6] backdrop-blur-lg rounded-3xl shadow-2xl border border-cognify-mint/40 overflow-hidden transition-all duration-700 w-full max-w-6xl">
        
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-[320px] md:h-[480px] overflow-hidden">
          <img
            src={slides[index].img}
            alt="Cognify memory"
            className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
        </div>

        {/* Text Section */}
        <div className="relative w-full md:w-1/2 flex flex-col items-start justify-center p-10 text-left">
          <img src={logo} alt="Cognify Logo" className="w-20 h-20 mb-6" />

          <p
            className={`text-2xl md:text-3xl font-semibold italic text-cognify-dark mb-6 leading-snug transition-opacity duration-700 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            “{slides[index].quote}”
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-cognify-teal to-cognify-dark text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95">
              Start Remembering
            </button>
            <button className="border border-cognify-teal text-cognify-dark px-6 py-2 rounded-lg font-semibold hover:bg-cognify-teal/10 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
