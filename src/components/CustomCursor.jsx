import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    const over = (event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      setLabel(target?.getAttribute('data-cursor') || '');
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  const hovering = Boolean(label);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      animate={{ x: pos.x - (hovering ? 30 : 4), y: pos.y - (hovering ? 30 : 4) }}
      transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
    >
      <motion.div
        animate={{ width: hovering ? 60 : 8, height: hovering ? 60 : 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={`flex items-center justify-center rounded-full ${
          hovering
            ? 'border border-[#FF72AD]/50 bg-[#060B19]/85 shadow-lg shadow-pink-600/30 backdrop-blur-md'
            : 'bg-[#FF2A85]'
        }`}
      >
        {hovering && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
