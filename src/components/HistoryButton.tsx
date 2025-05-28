import React, { forwardRef } from 'react';
import { Style } from '../ThemeContext';

interface HistoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Style;
  children: React.ReactNode;
  soundEnabled?: boolean;
  soundType?: 'click' | 'tick' | 'whoosh';
  muted?: boolean;
}

const HistoryButton = forwardRef<HTMLButtonElement, HistoryButtonProps>(({
  variant = 'primary',
  children,
  soundEnabled = false,
  soundType = 'tick',
  muted = false,
  className = '',
  style,
  onClick,
  ...props
}, ref) => {
  const variantClasses = {
    primary: 'text-theme-text-quaternary opacity-70 hover:opacity-100 hover:bg-theme-bg-tertiary hover:text-theme-text-secondary hover:border-theme-border-secondary',
    secondary: 'text-theme-text-quaternary opacity-70 hover:opacity-100 hover:bg-theme-bg-secondary hover:text-theme-text-primary hover:border-theme-border-primary',
    tertiary: 'text-theme-text-quaternary opacity-70 hover:opacity-100 hover:bg-theme-bg-primary hover:text-theme-text-tertiary hover:border-theme-border-tertiary'
  };

  const baseClasses = `
    group
    relative
    w-full
    h-8
    px-4
    text-sm
    font-['JetBrains_Mono']
    rounded-xl
    border
    border-transparent
    transition-all
    duration-100
    ease-in-out
    flex
    items-center
    justify-center
    truncate
    overflow-hidden
    hover:shadow-theme-button
    hover:scale-[1.02]
    hover:z-20
    hover:focus:ring-1
    hover:focus:ring-theme-border-tertiary
    hover:focus:outline-none
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const playSound = () => {
    if (!soundEnabled || muted) return;
    
    const soundFiles = {
      click: '/sounds/button-2.wav',
      tick: '/sounds/button-1.wav',
      whoosh: '/sounds/whoosh-2.wav'
    };

    const sound = new Audio(soundFiles[soundType]);
    sound.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound();
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={baseClasses}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {/* Gradient overlay - only visible on hover */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-100"
        style={{
          background: 'linear-gradient(to bottom, var(--gradient-overlay), transparent)'
        }}
      />
      
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
});

HistoryButton.displayName = 'HistoryButton';

export default HistoryButton;