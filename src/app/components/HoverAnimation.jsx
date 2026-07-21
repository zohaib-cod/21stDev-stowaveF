

"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as THREE from 'three';


export default function WovenLightHero() {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    textControls.start(i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 1.5,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }));
    buttonControls.start({
        opacity: 1,
        transition: { delay: 2.5, duration: 1 }
    });

    return () => {
        if (document.head.contains(link)) {
            document.head.removeChild(link);
        }
    }
  }, [textControls, buttonControls]);

  const headline = "Comfort by Stowave";
  
  return (
    <div className="w-full min-h-screen bg-black dark:bg-white overflow-y-auto scroll-smooth">
      
      {/* SECTION 1: Welcome Interactive Hero Screen */}
      <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Background Three.js Canvas Layer */}
        <WovenCanvas /> 

        {/* Floating Centered Typography Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl text-white dark:text-slate-900" style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 0 50px rgba(255, 255, 255, 0.3)' }}>
              {headline.split(" ").map((word, i) => (
                  <span key={i} className="inline-block">
                      {word.split("").map((char, j) => (
                          <motion.span key={j} custom={i * 5 + j} initial={{ opacity: 0, y: 50 }} animate={textControls} style={{ display: 'inline-block' }}>
                              {char}
                          </motion.span>
                      ))}
                      {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
                  </span>
              ))}
          </h1>
          <motion.p
            custom={headline.length}
            initial={{ opacity: 0, y: 30 }}
            animate={textControls}
            className="mx-auto mt-6 max-w-xl text-lg text-slate-300 dark:text-slate-600"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            An interactive tapestry of light and motion. Premium shirts, crafted with pure creativity.
          </motion.p>
        
          <motion.div initial={{ opacity: 0 }} animate={buttonControls} className="mt-10">
            <button className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10" style={{ fontFamily: "'Inter', sans-serif" }}>
              Connect With Us
            </button>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Sweatshirts Catalog Cards Wrapper */}
      <div className="relative z-20 bg-white dark:bg-zinc-950">
        {/* <SweatshirtPage /> */}
      </div>

      {/* SECTION 3: Future Sections Layout Space */}
      <div className="relative z-20 bg-white dark:bg-zinc-950">
        {/* <SweatshirtPage /> */}
       
      </div>

    </div>
  );
}

// --- Three.js Canvas Component (Remains same but isolated inside single hook context) ---
const WovenCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % torusKnot.attributes.position.count;
        const x = torusKnot.attributes.position.getX(vertexIndex);
        const y = torusKnot.attributes.position.getY(vertexIndex);
        const z = torusKnot.attributes.position.getZ(vertexIndex);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.8, isDarkMode ? 0.5 : 0.7);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        blending: isDarkMode ? THREE.NormalBlending : THREE.AdditiveBlending,
        transparent: true,
        opacity: isDarkMode ? 1.0 : 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
            const originalPos = new THREE.Vector3(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
            const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

            const dist = currentPos.distanceTo(mouseWorld);
            if (dist < 1.5) {
                const force = (1.5 - dist) * 0.01;
                const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
                velocity.add(direction.multiplyScalar(force));
            }

            const returnForce = new THREE.Vector3().subVectors(originalPos, currentPos).multiplyScalar(0.001);
            velocity.add(returnForce);
            velocity.multiplyScalar(0.95);

            positions[ix] += velocity.x;
            positions[iy] += velocity.y;
            positions[iz] += velocity.z;
            
            velocities[ix] = velocity.x;
            velocities[iy] = velocity.y;
            velocities[iz] = velocity.z;
        }

        geometry.attributes.position.needsUpdate = true;
        points.rotation.y = elapsedTime * 0.05;
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" />;
};

















// "use client";

// import { useRef, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import * as THREE from "three";
// import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
// import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// export default function WovenLightHero() {
//   const textControls = useAnimation();
//   const buttonControls = useAnimation();

//   useEffect(() => {
//     textControls.start((i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1 + 1.5,
//         duration: 1.2,
//         ease: [0.2, 0.65, 0.3, 0.9],
//       },
//     }));

//     buttonControls.start({
//       opacity: 1,
//       transition: { delay: 2.5, duration: 1 },
//     });
//   }, [textControls, buttonControls]);

//   const headline = "Comfort by Stowave";

//   return (
//     <div className="w-full min-h-screen bg-black dark:bg-white overflow-y-auto scroll-smooth">
//       <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
//         <WovenCanvas />
//         <div className="relative z-10 text-center px-4 pointer-events-none">
//           <h1
//             className="text-6xl md:text-8xl text-white dark:text-slate-900"
//             style={{
//               fontFamily: "'Playfair Display', serif",
//               textShadow: "0 0 50px rgba(255, 255, 255, 0.3)",
//             }}
//           >
//             {headline.split(" ").map((word, i) => (
//               <span key={i} className="inline-block text-[#c9731d]">
//                 {word.split("").map((char, j) => (
//                   <motion.span
//                     key={j}
//                     custom={i * 5 + j}
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={textControls}
//                     style={{ display: "inline-block" }}
//                   >
//                     {char}
//                   </motion.span>
//                 ))}
//                 {i < headline.split(" ").length - 1 && <span>&nbsp;</span>}
//               </span>
//             ))}
//           </h1>
//           <motion.p
//             custom={headline.length}
//             initial={{ opacity: 0, y: 30 }}
//             animate={textControls}
//             className="mx-auto mt-6 max-w-xl text-lg text-[#efefef] dark:text-slate-600"
//             style={{ fontFamily: "'Inter', sans-serif" }}
//           >
//             An interactive tapestry of light and motion. Premium shirts, crafted with pure creativity.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={buttonControls}
//             className="mt-10 pointer-events-auto"
//           >
//             <button
//               className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 dark:border-slate-800/20 dark:bg-slate-800/5 dark:text-slate-800 dark:hover:bg-slate-800/10"
//               style={{ fontFamily: "'Inter', sans-serif" }}
//             >
//               Connect With Us
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Build a realistic 3D oversized crew-neck tee from primitives ---
// function buildTeeGeometry() {
//   const parts = [];

//   // --- Torso (boxy oversized fit, slight taper, oval cross-section) ---
//   const torso = new THREE.CylinderGeometry(1.05, 1.15, 3.1, 40, 12, true);
//   torso.scale(1.0, 1.0, 0.55);
//   torso.translate(0, -0.2, 0);
//   parts.push(torso);

//   // Hem ring
//   const hem = new THREE.TorusGeometry(1.15, 0.06, 8, 40);
//   hem.rotateX(Math.PI / 2);
//   hem.scale(1.0, 1.0, 0.55);
//   hem.translate(0, -1.75, 0);
//   parts.push(hem);

//   // --- Shoulder caps ---
//   const shoulderCapL = new THREE.SphereGeometry(
//     0.55,
//     24,
//     16,
//     0,
//     Math.PI * 2,
//     0,
//     Math.PI / 2
//   );
//   shoulderCapL.scale(1.0, 0.65, 0.55);
//   shoulderCapL.translate(-0.85, 1.28, 0);
//   parts.push(shoulderCapL);

//   const shoulderCapR = shoulderCapL.clone();
//   shoulderCapR.translate(1.7, 0, 0);
//   parts.push(shoulderCapR);

//   // Shoulder yoke
//   const yoke = new THREE.CylinderGeometry(0.55, 0.55, 1.7, 32, 4, true);
//   yoke.rotateZ(Math.PI / 2);
//   yoke.scale(1.0, 0.55, 0.65);
//   yoke.translate(0, 1.28, 0);
//   parts.push(yoke);

//   // --- Sleeves ---
//   function makeSleeve(side) {
//     const sleeve = new THREE.CylinderGeometry(0.55, 0.48, 1.0, 24, 4, false);
//     sleeve.scale(1.0, 1.0, 0.85);
//     sleeve.rotateZ(side * (Math.PI / 2 - 0.35));
//     sleeve.translate(side * 1.35, 0.95, 0);
//     return sleeve;
//   }
//   parts.push(makeSleeve(1));
//   parts.push(makeSleeve(-1));

//   // --- Crew-neck collar ---
//   const collar = new THREE.TorusGeometry(0.42, 0.08, 12, 40);
//   collar.rotateX(Math.PI / 2);
//   collar.scale(1.0, 1.0, 0.7);
//   collar.translate(0, 1.55, 0);
//   parts.push(collar);

//   const merged = mergeGeometries(parts, false);
//   parts.forEach((g) => g.dispose());
//   merged.center();
//   return merged;
// }

// const WovenCanvas = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     const mount = mountRef.current;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5.2;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     mount.appendChild(renderer.domElement);

//     const mouse = new THREE.Vector2(0, 0);
//     const clock = new THREE.Clock();

//     // --- Build the 3D tee mesh and sample its surface for particles ---
//     const teeGeometry = buildTeeGeometry();
//     const samplerMesh = new THREE.Mesh(
//       teeGeometry,
//       new THREE.MeshBasicMaterial()
//     );
//     const sampler = new MeshSurfaceSampler(samplerMesh).build();

//     const particleCount = 22000;
//     const positions = new Float32Array(particleCount * 3);
//     const originalPositions = new Float32Array(particleCount * 3);
//     const velocities = new Float32Array(particleCount * 3);

//     const tmp = new THREE.Vector3();
//     const SCALE = 1.25;

//     for (let i = 0; i < particleCount; i++) {
//       sampler.sample(tmp);
//       const x = tmp.x * SCALE;
//       const y = tmp.y * SCALE;
//       const z = tmp.z * SCALE;

//       positions[i * 3] = x;
//       positions[i * 3 + 1] = y;
//       positions[i * 3 + 2] = z;
//       originalPositions[i * 3] = x;
//       originalPositions[i * 3 + 1] = y;
//       originalPositions[i * 3 + 2] = z;
//     }

//     teeGeometry.dispose();

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(positions, 3)
//     );

//     const material = new THREE.PointsMaterial({
//       color: 0xffffff,
//       size: 0.02,
//       transparent: true,
//       opacity: 0.95,
//       blending: THREE.NormalBlending,
//       depthWrite: false,
//     });

//     const points = new THREE.Points(geometry, material);
//     scene.add(points);

//     const handleMouseMove = (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     let animationFrameId;
//     const currentPos = new THREE.Vector3();
//     const originalPos = new THREE.Vector3();
//     const velocity = new THREE.Vector3();
//     const direction = new THREE.Vector3();
//     const returnForce = new THREE.Vector3();
//     const mouseWorld = new THREE.Vector3();

//     const animate = () => {
//       animationFrameId = requestAnimationFrame(animate);
//       const elapsedTime = clock.getElapsedTime();
//       mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

//       for (let i = 0; i < particleCount; i++) {
//         const ix = i * 3;
//         const iy = i * 3 + 1;
//         const iz = i * 3 + 2;

//         currentPos.set(positions[ix], positions[iy], positions[iz]);
//         originalPos.set(
//           originalPositions[ix],
//           originalPositions[iy],
//           originalPositions[iz]
//         );
//         velocity.set(velocities[ix], velocities[iy], velocities[iz]);

//         const dist = currentPos.distanceTo(mouseWorld);
//         if (dist < 1.5) {
//           const force = (1.5 - dist) * 0.01;
//           direction.subVectors(currentPos, mouseWorld).normalize();
//           velocity.add(direction.multiplyScalar(force));
//         }

//         returnForce.subVectors(originalPos, currentPos).multiplyScalar(0.001);
//         velocity.add(returnForce);
//         velocity.multiplyScalar(0.95);

//         positions[ix] += velocity.x;
//         positions[iy] += velocity.y;
//         positions[iz] += velocity.z;

//         velocities[ix] = velocity.x;
//         velocities[iy] = velocity.y;
//         velocities[iz] = velocity.z;
//       }

//       geometry.attributes.position.needsUpdate = true;
//       points.rotation.y = elapsedTime * 0.2;
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("resize", handleResize);
//       if (renderer.domElement.parentNode === mount) {
//         mount.removeChild(renderer.domElement);
//       }
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0 z-0 h-full w-full" />;
// };
