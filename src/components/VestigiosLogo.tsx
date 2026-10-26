import React from 'react';

interface VestigiosLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const VestigiosLogo: React.FC<VestigiosLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconHeight = size === 'sm' ? 24 : size === 'md' ? 32 : 46;
  const iconWidth = iconHeight * 1.6;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exact Isotype: Accordion folds, dashed void line, and red vestigio dot */}
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Isotipo Vestigios"
      >
        {/* Left solid pleats */}
        <path d="M10 10 L35 90 L60 10 Z" fill="#EAEAEA" />
        <path d="M60 10 L80 90" stroke="#EAEAEA" strokeWidth="3" strokeDasharray="6 6" />
        
        {/* Red vestigio dot in the center of the void dashed fold */}
        <circle cx="80" cy="52" r="7.5" fill="#E53935" />

        {/* Right solid pleats */}
        <path d="M80 90 L100 10 L125 90 L150 10" stroke="#EAEAEA" strokeWidth="1" fill="none" />
        <path d="M100 10 L125 90 L150 10 Z" fill="#EAEAEA" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-black tracking-[0.22em] text-xs sm:text-sm md:text-base text-[#eaeaea] uppercase">
            VESTIGIOS
          </span>
          <span className="hidden sm:block text-[9px] md:text-[10px] tracking-wide text-[#c9b79c] uppercase font-mono-archive line-clamp-1">
            El negacionismo frente a la inocencia de las víctimas
          </span>
        </div>
      )}
    </div>
  );
};
