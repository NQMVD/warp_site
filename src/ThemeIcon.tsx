import React from 'react';
import { Theme } from './ThemeContext';

interface ThemeIconProps {
  theme: Theme;
  className?: string;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({ theme, className = "w-4 h-4" }) => {
  switch (theme) {
    case 'spacegrey':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'catppuccin':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            fill="currentColor"
          />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" opacity="0.7"/>
          <circle cx="15" cy="9" r="1.5" fill="currentColor" opacity="0.7"/>
        </svg>
      );
    case 'light':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};