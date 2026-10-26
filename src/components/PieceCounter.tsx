import React, { useEffect, useState } from 'react';

interface PieceCounterProps {
  message: string | null;
}

export const PieceCounter: React.FC<PieceCounterProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (message) {
      setText(message);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible && !text) return null;

  return (
    <div
      className={`fixed bottom-20 md:bottom-24 left-4 md:left-8 z-40 transition-all duration-500 transform ${
        visible
          ? 'opacity-100 translate-y-0 filter blur-0'
          : 'opacity-0 translate-y-2 filter blur-sm pointer-events-none'
      }`}
    >
      <div className="px-3.5 py-2 rounded-lg bg-[#121212]/95 border border-[#e53935]/40 text-[#eaeaea] text-xs font-mono-archive shadow-2xl backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#e53935] animate-ping" />
        <span>{text}</span>
      </div>
    </div>
  );
};
