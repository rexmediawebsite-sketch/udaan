import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], button, a, input, select');
      if (target) {
        const label = target.getAttribute('data-cursor') || (target.tagName === 'A' ? 'View' : target.tagName === 'BUTTON' ? 'Click' : '');
        setCursorLabel(label);
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorLabel('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const render = () => {
      // Smooth trailing ring lerp
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Gold Center Dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot shadow-[0_0_8px_#D9A441]"
        aria-hidden="true"
      />

      {/* Trailing Responsive Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'active-interactive' : ''}`}
        aria-hidden="true"
      >
        <span className="custom-cursor-label">{cursorLabel}</span>
      </div>
    </>
  );
}
