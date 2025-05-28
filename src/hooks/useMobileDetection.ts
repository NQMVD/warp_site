import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const detectMobile = () => {
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android', 'webos', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'windows phone', 'mobile', 'tablet'
      ];
      const hasUserAgentMobile = mobileKeywords.some(keyword => 
        userAgent.includes(keyword)
      );

      // Check for touch capability
      const hasTouchScreen = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;

      // Check for fine pointer (desktop mice have fine pointers)
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      
      // Check for hover capability (most mobile devices don't have true hover)
      const hasNoHover = window.matchMedia('(hover: none)').matches;

      // Combine multiple detection methods
      const isMobileDevice = hasUserAgentMobile || 
        (hasTouchScreen && hasCoarsePointer) || 
        (hasTouchScreen && hasNoHover);

      setIsMobile(isMobileDevice);
    };

    detectMobile();

    // Listen for orientation changes (mobile-specific)
    const handleOrientationChange = () => {
      setTimeout(detectMobile, 100); // Small delay for orientation change
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', detectMobile);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', detectMobile);
    };
  }, []);

  return isMobile;
};