"use client";
import { useState, useEffect, useRef } from "react";

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);

  const images = [
   "https://images.unsplash.com/photo-1719368472026-dc26f70a9b76?q=80&h=800&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1649265825072-f7dd6942baed?q=80&h=800&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&h=800&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1729086046027-09979ade13fd?q=80&h=800&w=800&auto=format&fit=crop",         
            "https://images.unsplash.com/photo-1601568494843-772eb04aca5d?q=80&h=800&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585687501004-615dfdfde7f1?q=80&h=800&w=800&auto=format&fit=crop",
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (galleryRef.current && !galleryRef.current.contains(event.target)) {
        setActiveIndex(null); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://googleapis.com');
    
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <section className="w-full flex flex-col items-center justify-start py-12 min-h-screen">
        <div className="max-w-3xl text-center px-4">
          <h1 className="text-3xl font-semibold">Our Latest Creations</h1>
          <p className="text-sm text-slate-500 mt-2">
            A visual collection of our most recent works – each piece crafted
            with intention, emotion, and style.
          </p>
        </div>

        <div 
          ref={galleryRef}
          className="flex items-center gap-2 h-[400px] w-full max-w-5xl mt-10 px-4"
        >
          {images.map((src, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`
                  relative flex-grow transition-all duration-500 rounded-lg overflow-hidden h-[400px] cursor-pointer
                  
                  /* Desktop / Laptop settings */
                  md:w-56 md:hover:w-full
                  
                  /* Mobile settings (State dynamic calculation) */
                  ${isSelected ? "w-full" : "w-12 md:w-56"}
                `}
              >
                <img
                  className="h-full w-full object-cover object-center pointer-events-none"
                  src={src}
                  alt={`image-${idx}`}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
