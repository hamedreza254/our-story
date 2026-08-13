import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTER } from '../data/content';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 px-4">
      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-gradient text-center mb-14"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {LETTER.sectionTitle}
      </motion.h2>

      <div className="max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* ── Closed Envelope ── */
            <motion.button
              key="closed"
              onClick={() => setIsOpen(true)}
              className="w-full group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="relative rounded-2xl p-8 sm:p-10 overflow-hidden text-center"
                style={{
                  background: 'linear-gradient(150deg, #13092c, #0e0720)',
                  border: '1px solid rgba(212,160,185,0.12)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 0 50px rgba(212,160,185,0.02)',
                }}
              >
                {/* Flap triangle */}
                <div
                  className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(212,160,185,0.04), transparent)',
                    clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                  }}
                />

                {/* Seal */}
                <motion.div
                  className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212,160,185,0.15), rgba(167,139,250,0.15))',
                    border: '1.5px solid rgba(212,160,185,0.18)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(212,160,185,0.08)',
                      '0 0 25px rgba(212,160,185,0.18)',
                      '0 0 15px rgba(212,160,185,0.08)',
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <span className="text-xl">💌</span>
                </motion.div>

                <p className="text-sm group-hover:text-purple-200/60 transition-colors duration-300"
                  style={{ color: 'rgba(200,190,220,0.4)' }}
                >
                  {LETTER.closedHint}
                </p>

                {/* Decorative lines */}
                <div className="mt-5 flex flex-col items-center gap-1.5">
                  {[28, 22, 14].map((w, i) => (
                    <div key={i} className="h-px rounded" style={{
                      width: `${w}%`,
                      background: `rgba(167,139,250,${0.08 - i * 0.02})`,
                    }} />
                  ))}
                </div>
              </div>
            </motion.button>
          ) : (
            /* ── Open Letter ── */
            <motion.div
              key="open"
              className="w-full"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative rounded-2xl p-8 sm:p-10 overflow-hidden"
                style={{
                  background: 'linear-gradient(150deg, #13092c, #0e0720)',
                  border: '1px solid rgba(212,160,185,0.12)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.3), inset 0 0 60px rgba(212,160,185,0.02)',
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center rounded-full text-xs hover:bg-white/5 transition-colors"
                  style={{ color: 'rgba(180,170,200,0.35)' }}
                >✕</button>

                <motion.span
                  className="block text-2xl text-center mb-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
                >💝</motion.span>

                {LETTER.lines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-sm leading-loose text-center"
                    style={{
                      color: line ? 'rgba(220,210,240,0.6)' : undefined,
                      minHeight: !line ? 12 : undefined,
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.15 }}
                  >
                    {line}
                  </motion.p>
                ))}

                <motion.div
                  className="line-fade-pink w-16 mx-auto mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
