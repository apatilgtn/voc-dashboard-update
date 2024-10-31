import React from 'react';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -inset-[10px] opacity-50">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="animate-float"
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: 'currentColor',
            borderRadius: '50%',
            opacity: Math.random() * 0.3,
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  </div>
);

export default AnimatedBackground;