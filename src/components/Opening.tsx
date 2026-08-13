import { useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING } from '../data/content';

interface Props {
  onStart: () => void;
}

export default function Opening({ onStart }: Props) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    setOpening(true);
    setTimeout(onStart, 2200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden"
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.2, delay: opening ? 1 : 0 }}
    >
      {/* Radial ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="rounded-full"
          style={{
            width: 650, height: 650,
            background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, rgba(212,160,185,0.03) 40%, transparent 70%)',
          }}
          animate={opening ? { scale: 2.5, opacity: 0 } : { scale: [1, 1.05, 1] }}
          transition={opening
            ? { duration: 2, ease: 'easeInOut' }
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      <motion.div
        className="relative flex flex-col items-center gap-8 z-10 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* ── Book ── */}
        <motion.div
          className="relative select-none"
          animate={opening
            ? { rotateY: -90, scale: 0.7, opacity: 0 }
            : { y: [0, -6, 0] }
          }
          transition={opening
            ? { duration: 1.8, ease: [0.6, 0, 0.2, 1] }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ perspective: 1200 }}
        >
          {/* Shadow */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-44 h-5 rounded-full bg-black/15 blur-xl" />

          {/* Cover */}
          <div
            className="relative w-60 h-80 sm:w-68 sm:h-[22rem] rounded-lg overflow-hidden flex flex-col items-center justify-center text-center px-6"
            style={{
              background: 'linear-gradient(150deg, #12082a 0%, #0a0518 50%, #130a28 100%)',
              boxShadow: `-5px 0 20px rgba(0,0,0,0.4),
                5px 0 15px rgba(0,0,0,0.2),
                0 12px 50px rgba(0,0,0,0.5),
                inset 0 0 80px rgba(167,139,250,0.04)`,
              border: '1px solid rgba(167,139,250,0.12)',
            }}
          >
            {/* Spine */}
            <div className="absolute right-0 top-0 bottom-0 w-3"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.08), transparent)' }}
            />

            {/* Inner border */}
            <div className="absolute inset-4 rounded border border-dashed" style={{ borderColor: 'rgba(167,139,250,0.1)' }} />

            {/* Corners */}
            {[
              'top-5 right-5 border-t border-r',
              'top-5 left-5 border-t border-l',
              'bottom-5 right-5 border-b border-r',
              'bottom-5 left-5 border-b border-l',
            ].map((cls, i) => (
              <div key={i} className={`absolute ${cls} w-4 h-4 rounded-sm`}
                style={{ borderColor: 'rgba(212,160,185,0.2)' }} />
            ))}

            {/* Star top */}
            <motion.span
              className="text-xl mb-5 block"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ color: 'rgba(212,160,185,0.6)' }}
            >✦</motion.span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient mb-3">
              {LANDING.bookTitle}
            </h1>

            <div className="line-fade-pink w-16 mx-auto mb-3" />

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(200,190,220,0.5)' }}>
              {LANDING.subtitle}
            </p>

            <motion.span
              className="text-xl mt-5 block"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              style={{ color: 'rgba(212,160,185,0.6)' }}
            >✦</motion.span>
          </div>
        </motion.div>

        {/* ── Start button ── */}
        <motion.button
          onClick={handleClick}
          disabled={opening}
          className="group relative rounded-full px-10 py-4 text-sm sm:text-base font-medium disabled:cursor-wait overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(212,160,185,0.12))',
            border: '1px solid rgba(167,139,250,0.18)',
            color: 'var(--text-primary)',
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          animate={opening ? { opacity: 0, y: 30 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(212,160,185,0.22))' }}
          />
          <span className="relative z-10">
            {opening ? '...' : LANDING.startButton}
          </span>
        </motion.button>

        {/* ── Epigraph ── */}
        <motion.p
          className="text-xs max-w-xs text-center leading-relaxed"
          style={{ color: 'rgba(200,190,220,0.28)' }}
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
        >
          {LANDING.epigraph}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
