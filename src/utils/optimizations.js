import { useEffect, useState, useRef, useCallback } from 'react';

// Custom hook for lazy loading images and components
export const useLazyLoad = (ref, options = {}) => {
  const [isIntersecting, setIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
        ...options
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
};

// HOC for lazy loading components
export const withLazyLoad = (Component) => {
  return (props) => {
    const ref = useRef(null);
    const isVisible = useLazyLoad(ref);
    
    return (
      <div ref={ref} className="lazy-load-container">
        {isVisible && <Component {...props} />}
      </div>
    );
  };
};

// Lazy loaded image component
export const LazyImage = ({ src, alt, className, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const isVisible = useLazyLoad(imgRef);
  
  useEffect(() => {
    if (isVisible && imgRef.current) {
      const img = imgRef.current;
      img.onload = () => setLoaded(true);
      img.src = src;
    }
  }, [isVisible, src]);
  
  return (
    <img
      ref={imgRef}
      alt={alt}
      className={`lazy-load ${loaded ? 'lazy-loaded' : ''} ${className || ''}`}
      {...props}
    />
  );
};

// Performance optimization for animations
export const useAnimationFrameLoop = (callback, active = true) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  
  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);
  
  useEffect(() => {
    if (active) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [active, animate]);
};

// Web Vitals optimization helpers
export const optimizeWebVitals = () => {
  // Defer non-critical CSS
  const deferNonCriticalCSS = (url) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.media = 'print';
    document.head.appendChild(link);
    
    setTimeout(() => {
      link.media = 'all';
    }, 100);
  };
  
  // Pre-connect to required origins
  const preconnect = (url) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  };
  
  return {
    deferNonCriticalCSS,
    preconnect
  };
};

// Font optimization
export const optimizeFonts = () => {
  if ('fonts' in document) {
    // Prompt browser to load font files
    const fontPromises = [
      document.fonts.load('1rem "Inter"'),
      document.fonts.load('1rem "Poppins"')
    ];
    
    Promise.all(fontPromises).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
};
