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