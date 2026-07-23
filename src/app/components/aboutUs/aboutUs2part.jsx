// import React, { useRef } from 'react';
// import Link from "next/link";

// export function Marquee({
//   className,
//   reverse = false,
//   pauseOnHover = false,
//   children,
//   vertical = false,
//   repeat = 4,
//   ariaLabel,
//   ariaLive = 'off',
//   ariaRole = 'marquee',
//   ...props
// }) {
//   const marqueeRef = useRef(null);

//   const containerClasses = [
//     'group flex overflow-hidden p-2',
//     !vertical ? 'flex-row' : 'flex-col',
//     className,
//   ]
//     .filter(Boolean)
//     .join(' ');

//   return (
//     <div
//       {...props}
//       ref={marqueeRef}
//       data-slot="marquee"
//       className={containerClasses}
//       style={{ gap: '1rem', ...(props.style || {}) }}
//       aria-label={ariaLabel}
//       aria-live={ariaLive}
//       role={ariaRole}
//       tabIndex={0}
//     >
//       <style>{`
//         @keyframes claude-marquee-x {
//           from { transform: translateX(0); }
//           to { transform: translateX(calc(-100% - 1rem)); }
//         }
//         @keyframes claude-marquee-y {
//           from { transform: translateY(0); }
//           to { transform: translateY(calc(-100% - 1rem)); }
//         }
//         .claude-marquee-track {
//           animation: claude-marquee-x 40s linear infinite;
//         }
//         .claude-marquee-track.vertical {
//           animation-name: claude-marquee-y;
//         }
//         .claude-marquee-track.reverse {
//           animation-direction: reverse;
//         }
//         .group:hover .claude-marquee-track.pause-on-hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//       {React.useMemo(
//         () => (
//           <>
//             {Array.from({ length: repeat }, (_, i) => (
//               <div
//                 key={i}
//                 className={[
//                   'claude-marquee-track',
//                   'flex shrink-0 justify-around',
//                   vertical ? 'vertical flex-col' : 'flex-row',
//                   pauseOnHover ? 'pause-on-hover' : '',
//                   reverse ? 'reverse' : '',
//                 ]
//                   .filter(Boolean)
//                   .join(' ')}
//                 style={{ gap: '1rem' }}
//               >
//                 {children}
//               </div>
//             ))}
//           </>
//         ),
//         [repeat, children, vertical, pauseOnHover, reverse],
//       )}
//     </div>
//   );
// }




















"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import Link from "next/link";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ariaLive = 'off',
  ariaRole = 'marquee',
  ...props
}) {
  const marqueeRef = useRef(null);
  
  const [marqueeItems, setMarqueeItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_BASE_URL}/api/marquee`);
        const data = await res.json();
        if (data.success) {
          setMarqueeItems(data.items);
        }
      } catch (error) {
        console.error("Error fetching marquee items:", error);
      } finally {
        setLoaded(true);
      }
    };
    fetchMarquee();
  }, []);

  const containerClasses = [
    'group flex overflow-hidden p-2',
    !vertical ? 'flex-row' : 'flex-col',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentToRender = marqueeItems.length > 0 
    ? marqueeItems.map((item, index) => (
        <span 
          key={item._id || index} 
          className="!text-[11px] font-medium tracking-widest mx-10 text-neutral-800 uppercase"
        >
          {item.linkUrl ? (
            <Link href={item.linkUrl} className="hover:underline">
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </span>
      ))
    : children;

  const memoizedTracks = useMemo(
    () => (
      <>
        {Array.from({ length: repeat }, (_, i) => (
          <div
            key={i}
            className={[
              'claude-marquee-track',
              'flex shrink-0 justify-around',
              vertical ? 'vertical flex-col' : 'flex-row',
              pauseOnHover ? 'pause-on-hover' : '',
              reverse ? 'reverse' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ gap: '1rem' }}
          >
            {contentToRender}
          </div>
        ))}
      </>
    ),
    [repeat, contentToRender, vertical, pauseOnHover, reverse],
  );

  // Jab tak data load na ho, same div return karo taake DOM mismatch na ho
  if (!loaded) {
    return <div className={containerClasses} {...props} />;
  }

  if (marqueeItems.length === 0 && !children) return null;

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={containerClasses}
      style={{ gap: '1rem', ...(props.style || {}) }}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
    >
      <style>{`
        @keyframes claude-marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 1rem)); }
        }
        @keyframes claude-marquee-y {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - 1rem)); }
        }
        .claude-marquee-track {
          animation: claude-marquee-x 40s linear infinite;
        }
        .claude-marquee-track.vertical {
          animation-name: claude-marquee-y;
        }
        .claude-marquee-track.reverse {
          animation-direction: reverse;
        }
        .group:hover .claude-marquee-track.pause-on-hover {
          animation-play-state: paused;
        }
      `}</style>

      {memoizedTracks}
    </div>
  );
}