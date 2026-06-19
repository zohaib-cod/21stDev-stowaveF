// "use client";

// import React, { useRef, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import * as THREE from 'three';
// import SweatshirtPage from './sweatShirt/page';
// // Agar aapko Footer load karna ho to niche import line uncomment kar sakte hain
// // import Footer7 from './components/Footer/page';

// export default function WovenLightHero() {
//   const textControls = useAnimation();
//   const buttonControls = useAnimation();

//   useEffect(() => {
//     const link = document.createElement('link');
//     link.href = 'https://fonts.googleapis.com';
//     link.rel = 'stylesheet';
//     document.head.appendChild(link);

//     textControls.start(i => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1 + 1.5,
//         duration: 1.2,
//         ease: [0.2, 0.65, 0.3, 0.9]
//       }
//     }));
//     buttonControls.start({
//         opacity: 1,
//         transition: { delay: 2.5, duration: 1 }
//     });

//     return () => {
//         if (document.head.contains(link)) {
//             document.head.removeChild(link);
//         }
//     }
//   }, [textControls, buttonControls]);

//   const headline = "Comfort by Stowave";
  
//   return (
//     // 1. Parent Wrapper Container — Isko overflow-y-auto kiya taake scroll ho sake
//     <div className="w-full min-h-screen bg-black dark:bg-white overflow-y-auto scroll-smooth">
      
//       {/* SECTION 1: Welcome Interactive Hero Screen */}
//       <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
//         {/* Background Three.js Canvas Layer */}
//         <WovenCanvas /> 

//         {/* Floating Centered Typography Content */}
//         <div className="relative z-10 text-center px-4">
//           <h1 className="text-6xl md:text-8xl text-white dark:text-slate-900" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }}>
//               {headline.split(" ").map((word, i) => (
//                   <span key={i} className="inline-block">
//                       {word.split("").map((char, j) => (
//                           <motion.span key={j} custom={i * 5 + j} initial={{ opacity: 0, y: 50 }} animate={textControls} style={{ display: 'inline-block' }}>
//                               {char}
//                           </motion.span>
//                       ))}
//                       {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
//                   </span>
//               ))}
//           </h1>
//           <motion.p
//             custom={headline.length}
//             initial={{ opacity: 0, y: 30 }}
//             animate={textControls}
//             className="mx-auto mt-6 max-w-xl text-lg text-slate-300 dark:text-slate-600"
//             style={{ fontFamily: "'Inter', sans-serif" }}
//           >
//             An interactive tapestry of light and motion. Premium shirts, crafted with pure creativity.
//           </motion.p>
//           <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10">
//             <button className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10" style={{ fontFamily: "'Inter', sans-serif" }}>
//               Connect With Us
//             </button>
//           </motion.div>
//         </div>
//       </div>

//       {/* SECTION 2: Sweatshirts Catalog Cards Wrapper */}
//       <div className="relative z-20 bg-white dark:bg-zinc-950">
//         <SweatshirtPage />
//       </div>

//       {/* SECTION 3: Future Sections Layout Space */}
//       {/* Jab bhi aapko koi naya feature card ya layout section daalna ho, aap direct is block ke niche likh sakte hain, wo automatic serial wise vertical position le lega */}
//       <div className="relative z-20 bg-white dark:bg-zinc-950">
//         <SweatshirtPage />
       
//       </div>

//     </div>
//   );
// }

// // --- Three.js Canvas Component (Remains same but isolated inside single hook context) ---
// const WovenCanvas = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 5;
//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mountRef.current.appendChild(renderer.domElement);

//     const mouse = new THREE.Vector2(0, 0);
//     const clock = new THREE.Clock();
//     const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

//     const particleCount = 50000;
//     const positions = new Float32Array(particleCount * 3);
//     const originalPositions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
//     const velocities = new Float32Array(particleCount * 3);

//     const geometry = new THREE.BufferGeometry();
//     const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

//     for (let i = 0; i < particleCount; i++) {
//         const vertexIndex = i % torusKnot.attributes.position.count;
//         const x = torusKnot.attributes.position.getX(vertexIndex);
//         const y = torusKnot.attributes.position.getY(vertexIndex);
//         const z = torusKnot.attributes.position.getZ(vertexIndex);
        
//         positions[i * 3] = x;
//         positions[i * 3 + 1] = y;
//         positions[i * 3 + 2] = z;
//         originalPositions[i * 3] = x;
//         originalPositions[i * 3 + 1] = y;
//         originalPositions[i * 3 + 2] = z;

//         const color = new THREE.Color();
//         color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7);
//         colors[i * 3] = color.r;
//         colors[i * 3 + 1] = color.g;
//         colors[i * 3 + 2] = color.b;
        
//         velocities[i * 3] = 0;
//         velocities[i * 3 + 1] = 0;
//         velocities[i * 3 + 2] = 0;
//     }

//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//     const material = new THREE.PointsMaterial({
//         size: 0.02,
//         vertexColors: true,
//         blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
//         transparent: true,
//         opacity: isDarkMode ? 1.0 : 0.8,
//     });

//     const points = new THREE.Points(geometry, material);
//     scene.add(points);

//     const handleMouseMove = (event) => {
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     const handleResize = () => {
//         if (!mountRef.current) return;
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     let animationFrameId;
//     const animate = () => {
//         animationFrameId = requestAnimationFrame(animate);
//         const elapsedTime = clock.getElapsedTime();
//         const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

//         for (let i = 0; i < particleCount; i++) {
//             const ix = i * 3;
//             const iy = i * 3 + 1;
//             const iz = i * 3 + 2;

//             const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
//             const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
//             const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

//             const dist = currentPos.distanceTo(mouseWorld);
//             if (dist < 1.5) {
//                 const force = (1.5 - dist) * 0.01;
//                 const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
//                 velocity.add(direction.multiplyScalar(force));
//             }

//             const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.001);
//             velocity.add(returnForce);
//             velocity.multiplyScalar(0.95);

//             positions[ix] += velocity.x;
//             positions[iy] += velocity.y;
//             positions[iz] += velocity.z;
            
//             velocities[ix] = velocity.x;
//             velocities[iy] = velocity.y;
//             velocities[iz] = velocity.z;
//         }

//         geometry.attributes.position.needsUpdate = true;
//         points.rotation.y = elapsedTime * 0.05;
//         renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//         cancelAnimationFrame(animationFrameId);
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('resize', handleResize);
//         if (mountRef.current && renderer.domElement) {
//             mountRef.current.removeChild(renderer.domElement);
//         }
//         geometry.dispose();
//         material.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" />;
// };
















// "use client";

// import React from 'react'
// import WovenLightHero from './components/HoverAnimation'
// import SweatshirtPage from './overSized/page'
// import Example from './components/collection/collection'
// import SocialCards from './components/DailyPosts/dailyPost';
// import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';

// const sampleCards = [
//   { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
//   { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
//   { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
//   { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
// ];
// const sampleCardsScollGallery = [
//   { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
//   { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
//   { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
//   { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
//   { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
// ];

// function page() {
//   return (
//     <div className="page-clip">
//       <WovenLightHero/>
//       <SweatshirtPage/>
//       <SweatshirtPage/>
//       <Example/>
//       <SweatshirtPage/>
//       <SocialCards cards={sampleCards}/>
//       <SweatshirtPage/>
//       <RadialScrollGallery  cards={sampleCardsScollGallery}/>
//     </div>
//   )
// }

// export default page


















"use client";

import React from 'react'
import WovenLightHero from './components/HoverAnimation'
import SweatshirtPage from './overSized/page'
import Example from './components/collection/collection'
import SocialCards from './components/DailyPosts/dailyPost';
import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
// import { ImageTrail } from './components/cursorFollowAlbum/cursorFollowAlbum';

const sampleCards = [
  { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
  { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
  { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
  { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
];
const sampleCardsScollGallery = [
  { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
  { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
  { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
  { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },

];

function page() {
  return (
    <div className="page-clip">
      <WovenLightHero/>
      <SweatshirtPage/>
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
      <SweatshirtPage/>
      <SocialCards cards={sampleCards}/>
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
    </div>
  )
}

export default page
