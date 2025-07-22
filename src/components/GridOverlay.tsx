import React, { useRef, useEffect, useState } from 'react';

interface GridOverlayProps {
  buttonHeight?: number;
  buttonWidth?: number;
  className?: string;
}

const GridOverlay: React.FC<GridOverlayProps> = ({
  buttonHeight = 32,
  buttonWidth = 0, // Will be calculated from container
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const defaultColumns = 4;
  const effectiveButtonWidth = buttonWidth || (dimensions.width / defaultColumns); // Use configurable default columns
  const cols = Math.floor(dimensions.width / effectiveButtonWidth);
  const rows = Math.floor(dimensions.height / buttonHeight);
  const dots: React.ReactNode[] = [];

  // Generate dots for the grid (excluding outer edges)
  for (let row = 1; row < rows; row++) {
    for (let col = 1; col < cols; col++) {
      const dotId = `${row}-${col}`;
      const x = (col * effectiveButtonWidth);
      const y = (row * buttonHeight);
      
      dots.push(
        <div
          key={dotId}
          className="absolute w-0.5 h-0.5 bg-theme-text-quaternary rounded-full opacity-30 pointer-events-none transition-opacity duration-100"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      );
    }
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`}>
      {dots}
    </div>
  );
};

export default GridOverlay;
