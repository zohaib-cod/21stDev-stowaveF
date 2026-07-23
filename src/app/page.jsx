// "use client";

// import React from 'react'
// import WovenLightHero from './components/HoverAnimation'
// // import SweatshirtPage from './overSized/page'
// import Example from './components/collection/collection'
// import SocialCards from './components/DailyPosts/dailyPost';
// import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
// import { HeroSection } from './components/slider/slider';
// import { Marquee } from './components/aboutUs/aboutUs2part';
// import RegularFitPage from './regularFitt/page';
// import OversizedPage from './overSized/page';
// import SweatshirtPage from './sweatShirt/page';
// // import { ImageTrail } from './components/cursorFollowAlbum/cursorFollowAlbum';

// const sampleCards = [
//   { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
//   { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
//   { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
//   { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
 
// ];
// const sampleCardsScollGallery = [
//   { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
//   { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
//   { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
//   { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },

// ];

// const heroSliderImages = [
//   { src: "/IMG_4623.PNG", alt: "Slide 1" },
//   { src: "/IMG_4632.PNG", alt: "Slide 2" },
//   { src: "/IMG_4824.PNG", alt: "Slide 3" },
//   { src: "/IMG_4909.PNG", alt: "Slide 4" },
//   { src: "/IMG_4916.PNG", alt: "Slide 5" },
// ];

// function page() {
//   return (
//     <div className="page-clip">
//       <div className="w-full bg-gray-100 !py-1 border-y border-gray-200">
        
//       </div>
//       <WovenLightHero/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//       <SweatshirtPage/>
//       {/* <SweatshirtPage/> */}
//       <HeroSection
//         title="Crafted For Every Story"
//         subtitle="Discover pieces designed to move with you, wherever the day takes you."
//         images={heroSliderImages}
//         />
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>

//       <RegularFitPage/>
//       <Example/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//         <OversizedPage/>
//       <SocialCards cards={sampleCards}/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>      
//       <RadialScrollGallery>
//         {() =>
//           sampleCardsScollGallery.map((card, index) => (
//             <div key={index} className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md">
//               <img 
//                 src={card.imgUrl} 
//                 alt={card.alt || `gallery-${index}`} 
//                 className="w-full h-full object-cover select-none"
//                 draggable="false"
//               />
//             </div>
//           ))
//         }
//       </RadialScrollGallery>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//     </div>
//   )
// }

// export default page



















// "use client";

// import React, { useState, useEffect } from 'react'
// import WovenLightHero from './components/HoverAnimation'
// // import SweatshirtPage from './overSized/page'
// import Example from './components/collection/collection'
// import SocialCards from './components/DailyPosts/dailyPost';
// import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
// import { HeroSection } from './components/slider/slider';
// import { Marquee } from './components/aboutUs/aboutUs2part';
// import RegularFitPage from './regularFitt/page';
// import OversizedPage from './overSized/page';
// import SweatshirtPage from './sweatShirt/page';
// // import { ImageTrail } from './components/cursorFollowAlbum/cursorFollowAlbum';

// const sampleCards = [
//   { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
//   { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
//   { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
//   { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
// ];

// const heroSliderImages = [
//   { src: "/IMG_4623.PNG", alt: "Slide 1" },
//   { src: "/IMG_4632.PNG", alt: "Slide 2" },
//   { src: "/IMG_4824.PNG", alt: "Slide 3" },
//   { src: "/IMG_4909.PNG", alt: "Slide 4" },
//   { src: "/IMG_4916.PNG", alt: "Slide 5" },
// ];

// function page() {
//   // 🟢 NEW: State for Radial Gallery Items
//   const [galleryItems, setGalleryItems] = useState([]);

//   // 🟢 NEW: API se data fetch karne ka logic
//   useEffect(() => {
//     const fetchGalleryItems = async () => {
//       try {
//         // Agar aapka frontend Next.js aur backend alag alag port par hai (e.g. 5000), 
//         // toh yahan pura URL likhein jaise "http://localhost:5000/api/radialgallery"
//         // Verna relative path bhi chalega "/api/radialgallery"
//         const response = await fetch("http://localhost:5000/api/radialgallery"); 
//         const data = await response.json();
        
//         if (data.success) {
//           setGalleryItems(data.items);
//         } else {
//           console.error("Failed to fetch gallery items:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching gallery items:", error);
//       }
//     };

//     fetchGalleryItems();
//   }, []);

//   return (
//     <div className="page-clip">
//       <div className="w-full bg-gray-100 !py-1 border-y border-gray-200">
        
//       </div>
//       <WovenLightHero/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//       <SweatshirtPage/>
//       {/* <SweatshirtPage/> */}
//       <HeroSection
//         title="Crafted For Every Story"
//         subtitle="Discover pieces designed to move with you, wherever the day takes you."
//         images={heroSliderImages}
//         />
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>

//       <RegularFitPage/>
//       <Example/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//         <OversizedPage/>
//       <SocialCards cards={sampleCards}/>
//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>      
      
//       {/* 🟢 MODIFIED: Ab array ki jagah database se aaya hua data map hoga */}
//       {galleryItems.length > 0 && (
//         <RadialScrollGallery>
//           {() =>
//             galleryItems.map((card, index) => (
//               <div key={card._id || index} className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md">
//                 <img 
//                   src={card.imgUrl} 
//                   alt={card.alt || `gallery-${index}`} 
//                   className="w-full h-full object-cover select-none"
//                   draggable="false"
//                 />
//               </div>
//             ))
//           }
//         </RadialScrollGallery>
//       )}

//       <Marquee pauseOnHover className="[--duration:20s] !p-0">
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FREE SHIPPING ON ALL ORDERS OVER 5000</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">FLAT 20 PERCENT OFF ON NEW ARRIVALS</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">STREETWEAR SEASON DROPS ARE LIVE NOW</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">BUY TWO GET ONE FREE SITEWIDE</span>
//           <span className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase">LIMITED STOCK AVAILABLE SHOP THE VIBE</span>
//         </Marquee>
//     </div>
//   )
// }

// export default page








































"use client";

import React, { useState, useEffect } from 'react'
import WovenLightHero from './components/HoverAnimation'
import Example from './components/collection/collection'
import SocialCards from './components/DailyPosts/dailyPost';
import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
import { HeroSection } from './components/slider/slider';
import { Marquee } from './components/aboutUs/aboutUs2part'; // Aapka Marquee yahan import ho raha hai
import RegularFitPage from './regularFitt/page';
import OversizedPage from './overSized/page';
import SweatshirtPage from './sweatShirt/page';

const sampleCards = [
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

// 🟢 FIXED: 'page' ka 'P' capital kar diya gaya hai
function Page() {
  // State for Radial Gallery Items
  const [galleryItems, setGalleryItems] = useState([]);

  // API se data fetch karne ka logic
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/radialgallery`);
        const data = await response.json();
        
        if (data.success) {
          setGalleryItems(data.items);
        } else {
          console.error("Failed to fetch gallery items:", data.error);
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div className="page-clip">
      <div className="w-full bg-gray-100 !py-1 border-y border-gray-200">
        
      </div>
      <WovenLightHero/>
      
      {/* 🟢 Marquee Call */}
      <Marquee pauseOnHover className="[--duration:20s] !p-0" />

      <SweatshirtPage/>
      
      <HeroSection
        title="Crafted For Every Story"
        subtitle="Discover pieces designed to move with you, wherever the day takes you."
        images={heroSliderImages}
        />
        
      <Marquee pauseOnHover className="[--duration:20s] !p-0" />

      <RegularFitPage/>
      <Example/>
      
      <Marquee pauseOnHover className="[--duration:20s] !p-0" />
        
      <OversizedPage/>
      <SocialCards cards={sampleCards}/>
      
      <Marquee pauseOnHover className="[--duration:20s] !p-0" />      
      
      {/* Radial Gallery mapped from database */}
      {galleryItems.length > 0 && (
        <RadialScrollGallery>
          {() =>
            galleryItems.map((card, index) => (
              <div key={card._id || index} className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md">
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
      )}

      <Marquee pauseOnHover className="[--duration:20s] !p-0" />
    </div>
  )
}

// 🟢 FIXED: Export mein bhi 'P' capital kar diya gaya hai
export default Page;