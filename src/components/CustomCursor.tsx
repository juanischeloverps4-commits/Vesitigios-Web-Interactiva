import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  cursorLabel?: string;
  isHoveringInteractive?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorLabel = '',
  isHoveringInteractive = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // Both the center dot and the orbit circle are strictly centered on the mouse position
      if (dotRef.current) {
        dotRef.current.style.transform = transform;
      }
      if (orbitRef.current) {
        orbitRef.current.style.transform = transform;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = transform;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`custom-cursor hidden xl:block fixed inset-0 pointer-events-none z-50 ${
        isVisible ? 'is-visible' : ''
      } ${isHoveringInteractive ? 'is-enter' : ''}`}
      aria-hidden="true"
    >
      {/* Concentric orbit ring always centered exactly on the cursor */}
      <div
        ref={orbitRef}
        className="cursor-orbit will-change-transform"
        style={{ left: 0, top: 0 }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="cursor-dot will-change-transform"
        style={{ left: 0, top: 0 }}
      />
      {/* Dynamic text badge */}
      {cursorLabel && (
        <div
          ref={labelRef}
          className="cursor-label will-change-transform font-mono-archive"
          style={{ left: 0, top: 0 }}
        >
          {cursorLabel}
        </div>
      )}
    </div>
  );
};
