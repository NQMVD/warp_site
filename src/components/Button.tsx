import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  noiseOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  enableGradient?: boolean;
  enableNoise?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  soundEnabled?: boolean;
  soundType?: 'click' | 'tick' | 'whoosh';
  muted?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  noiseOpacity = 0.3,
  gradientFrom = 'var(--gradient-overlay)',
  gradientTo = 'transparent',
  enableGradient = true,
  enableNoise = false,
  variant = 'primary',
  size = 'md',
  children,
  soundEnabled = false,
  soundType = 'click',
  muted = false,
  className = '',
  style,
  onClick,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-16 px-8 text-lg'
  };

  const variantClasses = {
    primary: 'bg-theme-bg-tertiary text-theme-text-secondary border-theme-border-secondary hover:bg-theme-bg-hover focus:ring-theme-border-tertiary',
    secondary: 'bg-theme-bg-secondary text-theme-text-primary border-theme-border-primary hover:bg-theme-bg-hover focus:ring-theme-border-secondary',
    tertiary: 'bg-theme-bg-primary text-theme-text-tertiary border-theme-border-tertiary hover:bg-theme-bg-hover focus:ring-theme-border-primary'
  };

  const baseClasses = `
    rounded-xl
    shadow-theme-button
    border
    focus:outline-none focus:ring-1
    font-['JetBrains_Mono']
    transform transition-all duration-200 hover:scale-[1.05]
    relative
    overflow-hidden
    flex items-center justify-center
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const combinedStyle = {
    ...style,
    ...(enableNoise && { '--noise-opacity': noiseOpacity }),
    ...(enableGradient && { 
      '--gradient-from': gradientFrom,
      '--gradient-to': gradientTo 
    })
  } as React.CSSProperties;

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
      style={combinedStyle}
      onClick={handleClick}
      {...props}
    >
      {/* Noise overlay */}
      {enableNoise && (
        <div 
          className="absolute inset-0 noise mix-blend-overlay pointer-events-none rounded-xl"
          style={{ opacity: noiseOpacity }}
        />
      )}
      
      {/* Gradient overlay */}
      {enableGradient && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
          }}
        />
      )}
      
      {/* Content */}
      <span className="relative">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;