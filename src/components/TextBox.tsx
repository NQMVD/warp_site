import React, { forwardRef } from 'react';

interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  noiseOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
  enableGradient?: boolean;
  enableNoise?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const TextBox = forwardRef<HTMLInputElement, TextBoxProps>(({
  noiseOpacity = 0.3,
  gradientFrom = 'var(--gradient-overlay)',
  gradientTo = 'transparent',
  enableGradient = false,
  enableNoise = false,
  variant = 'primary',
  className = '',
  style,
  ...props
}, ref) => {
  const variantClasses = {
    primary: 'bg-theme-bg-tertiary text-theme-text-secondary border-theme-border-secondary focus:ring-theme-border-tertiary',
    secondary: 'bg-theme-bg-secondary text-theme-text-primary border-theme-border-primary focus:ring-theme-border-secondary',
    tertiary: 'bg-theme-bg-primary text-theme-text-tertiary border-theme-border-tertiary focus:ring-theme-border-primary'
  };

  const baseClasses = `
    flex1 h-12 px-4 text-base rounded-xl
    shadow-theme-button
    border
    focus:outline-none focus:ring-1
    font-['JetBrains_Mono']
    relative
    overflow-hidden
    transition-all duration-200
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

  return (
    <div className="relative flex-1">
      <input
        ref={ref}
        className={baseClasses}
        style={combinedStyle}
        {...props}
      />
      
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
    </div>
  );
});

TextBox.displayName = 'TextBox';

export default TextBox;