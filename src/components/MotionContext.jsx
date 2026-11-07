import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const EASE_TECH = [0.22, 1, 0.36, 1];

const MotionContext = createContext({
  motionEnabled: true,
  theme: 'dark',
  toggleTheme: () => {}
});

export function MotionProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-motion', 'on');
    const savedTheme = localStorage.getItem('rakit_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('rakit_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return (
    <MotionContext.Provider
      value={{
        motionEnabled: true,
        theme,
        toggleTheme
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
  once = true
}) {
  const { motionEnabled } = useMotionPreference();
  const Component = motion[as] || motion.div;

  if (!motionEnabled) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: EASE_TECH }}
    >
      {children}
    </Component>
  );
}
