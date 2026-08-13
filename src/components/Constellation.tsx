import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CH2 } from '../data/content';

// Fixed constellation points (relative %, so responsive)
const POINTS = [
  { x: 25, y: 22 },
  { x: 52, y: 15 },
  { x: 75, y: 28 },
  { x: 40, y: 50 },
  { x: 65, y: 55 },
  { x: 30, y: 75 },
  { x: 58, y: 80 },
];

// Lines connecting the stars
const LINES = [
  [0, 1], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6],
];

export default function Constellation() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const memories = CH2.constellationMemories;

  const getMemoryForPoint = useCallback(
    (idx: number) => memories[idx % memories.length],
    [memories],
  );

  return (
    <div
      className="relative w-full max-w-md mx-auto aspect-square select-none"
    >
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {LINES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={POINTS[a].x} y1={POINTS[a].y}
            x2={POINTS[b].x} y2={POINTS[b].y}
            stroke="rgba(167,139,250,0.12)"
            strokeWidth={0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.12 }}
          />
        ))}
      </svg>

      {/* Star points */}
      {POINTS.map((pt, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${pt.x}%`,
            top: `${pt.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.button
            className="relative w-6 h-6 flex items-center justify-center"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onTouchStart={() => setHoveredIdx(hoveredIdx === i ? null : i)}
            whileHover={{ scale: 1.6 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 200 }}
          >
            {/* Glow */}
            <div
              className="absolute rounded-full"
              style={{
                width: 18, height: 18,
                background: 'radial-gradient(circle, rgba(212,160,185,0.35), transparent 70%)',
                filter: 'blur(3px)',
              }}
            />
            {/* Dot */}
            <div
              className="relative w-2 h-2 rounded-full"
              style={{
                background: hoveredIdx === i
                  ? 'rgba(232,210,255,0.95)'
                  : 'rgba(212,200,240,0.7)',
                boxShadow: hoveredIdx === i
                  ? '0 0 12px rgba(212,160,185,0.5)'
                  : '0 0 6px rgba(167,139,250,0.25)',
              }}
            />
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIdx === i && (
              <motion.div
                className="absolute z-20 whitespace-nowrap px-4 py-2 rounded-xl text-xs"
                style={{
                  bottom: '130%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(15,10,35,0.92)',
                  border: '1px solid rgba(167,139,250,0.15)',
                  color: 'rgba(220,210,240,0.85)',
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                {getMemoryForPoint(i)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
