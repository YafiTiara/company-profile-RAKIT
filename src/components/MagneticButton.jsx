import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionPreference } from './MotionContext.jsx';

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  ariaLabel,
  type = 'button',
  target,
  rel
}) {
  const { motionEnabled } = useMotionPreference();
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!motionEnabled || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.2;
    const deltaY = (e.clientY - centerY) * 0.2;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClass = `btn-rakit btn-${variant} ${className}`.trim();

  const springConfig = {
    type: 'spring',
    stiffness: 230,
    damping: 20,
    mass: 0.6
  };

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={motionEnabled ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
        transition={springConfig}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={motionEnabled ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={springConfig}
    >
      {children}
    </motion.button>
  );
}
