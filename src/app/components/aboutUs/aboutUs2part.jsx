// import React, { useRef, useMemo } from 'react';

// // Custom lightweight clsx helper function jo exactly 'cn' jaisa kaam karegi
// // Is se bina external file import kiye aap ka UI/Tailwind styles perfectly chalenge
// function cn(...classes) {
//   return classes
//     .flatMap((c) => {
//       if (!c) return [];
//       if (typeof c === 'string') return c.split(' ');
//       if (typeof c === 'object') {
//         return Object.entries(c)
//           .filter(([_, value]) => Boolean(value))
//           .map(([key]) => key);
//       }
//       return [];
//     })
//     .filter(Boolean)
//     .join(' ');
// }

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

//   return (
//     <div
//       {...props}
//       ref={marqueeRef}
//       data-slot="marquee"
//       className={cn(
//         'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
//         {
//           'flex-row': !vertical,
//           'flex-col': vertical,
//         },
//         className,
//       )}
//       aria-label={ariaLabel}
//       aria-live={ariaLive}
//       role={ariaRole}
//       tabIndex={0}
//     >
//       {useMemo(
//         () => (
//           <>
//             {Array.from({ length: repeat }, (_, i) => (
//               <div
//                 key={i}
//                 className={cn(
//                   !vertical ? 'flex-row [gap:var(--gap)]' : 'flex-col [gap:var(--gap)]',
//                   'flex shrink-0 justify-around',
//                   !vertical && 'animate-marquee flex-row',
//                   vertical && 'animate-marquee-vertical flex-col',
//                   pauseOnHover && 'group-hover:[animation-play-state:paused]',
//                   reverse && '[animation-direction:reverse]',
//                 )}
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







import React, { useRef } from 'react';
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

  const containerClasses = [
    'group flex overflow-hidden p-2',
    !vertical ? 'flex-row' : 'flex-col',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
      {React.useMemo(
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
                {children}
              </div>
            ))}
          </>
        ),
        [repeat, children, vertical, pauseOnHover, reverse],
      )}
    </div>
  );
}