import React, { useRef, useState } from 'react';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  pullFactor = 12,
  cursorLabel = 'Click',
  as: Component = 'button',
  ...props
}) {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setPosition({
      x: deltaX * pullFactor,
      y: deltaY * pullFactor,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rippleId = Date.now();

    setRipples((prev) => [...prev, { x, y, id: rippleId }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <Component
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor={cursorLabel}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.1s ease-out',
      }}
      className={`btn-magnetic relative inline-flex items-center justify-center select-none ${className}`}
      {...props}
    >
      {children}

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none bg-white/30 animate-ping"
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30,
          }}
        />
      ))}
    </Component>
  );
}
