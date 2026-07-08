"use client";

import React from 'react'
import WovenLightHero from './components/HoverAnimation'
import SweatshirtPage from './overSized/page'
import Example from './components/collection/collection'
import SocialCards from './components/DailyPosts/dailyPost';
import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
import { HeroSection } from './components/slider/slider';
import { Marquee } from './components/aboutUs/aboutUs2part';
// import { ImageTrail } from './components/cursorFollowAlbum/cursorFollowAlbum';

const sampleCards = [
  { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
  { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
  { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
  { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
 
];
const sampleCardsScollGallery = [
  { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
  { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
  { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
  { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },

];

const heroSliderImages = [
  { src: "/IMG_4623.PNG", alt: "Slide 1" },
  { src: "/IMG_4632.PNG", alt: "Slide 2" },
  { src: "/IMG_4824.PNG", alt: "Slide 3" },
  { src: "/IMG_4909.PNG", alt: "Slide 4" },
  { src: "/IMG_4916.PNG", alt: "Slide 5" },
];

function page() {
  return (
    <div className="page-clip">
      <div className="w-full bg-gray-100 !py-1 border-y border-gray-200">
        
      </div>
      <WovenLightHero/>
      <Marquee pauseOnHover className="[--duration:20s] !p-0">
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
        </Marquee>
      <SweatshirtPage/>
      <HeroSection
        title="Crafted For Every Story"
        subtitle="Discover pieces designed to move with you, wherever the day takes you."
        images={heroSliderImages}
      />
      <Marquee pauseOnHover className="[--duration:20s] !p-0">
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
        </Marquee>
      {/* <ImageTrail/> */}
{/* <div className="relative w-full h-[500px]">
  <ImageTrail>
    <img src="/IMG_4623.PNG" alt="trail 1" className="w-24 h-24 object-cover rounded-lg" />
    <img src="/IMG_4632.PNG" alt="trail 2" className="w-24 h-24 object-cover rounded-lg" />
    <img src="/IMG_4824.PNG" alt="trail 3" className="w-24 h-24 object-cover rounded-lg" />
    <img src="/IMG_4909.PNG" alt="trail 4" className="w-24 h-24 object-cover rounded-lg" />
    <img src="/IMG_4916.PNG" alt="trail 5" className="w-24 h-24 object-cover rounded-lg" />
  </ImageTrail>
</div> */}

      <SweatshirtPage/>
      <Example/>
      <Marquee pauseOnHover className="[--duration:20s] !p-0">
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
        </Marquee>
      <SweatshirtPage/>
      <SocialCards cards={sampleCards}/>
      <Marquee pauseOnHover className="[--duration:20s] !p-0">
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
        </Marquee>
      <SweatshirtPage/>
      
      {/* 🟢 Function-based render pattern implemented properly */}
      <RadialScrollGallery>
        {() =>
          sampleCardsScollGallery.map((card, index) => (
            <div key={index} className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md">
              <img 
                src={card.imgUrl} 
                alt={card.alt || `gallery-${index}`} 
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
          ))
        }
      </RadialScrollGallery>
      <Marquee pauseOnHover className="[--duration:20s] !p-0">
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
          <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
        </Marquee>
    </div>
  )
}

export default page



















