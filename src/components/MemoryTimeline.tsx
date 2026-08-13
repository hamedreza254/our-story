import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE } from '../data/content';

interface MemoryItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function MemoryTimeline() {
  const [selected, setSelected] = useState<MemoryItem | null>(null);

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
        {TIMELINE.sectionTitle}
      </motion.h2>

      {/* Timeline container */}
      <div className="relative max-w-lg mx-auto">
        {/* Vertical line */}
        <div
          className="absolute top-0 bottom-0 w-px right-5 sm:right-1/2"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(167,139,250,0.18) 10%, rgba(212,160,185,0.18) 90%, transparent 100%)',
          }}
        />

        {TIMELINE.items.map((item, idx) => (
          <motion.div
            key={item.id}
            className="relative mb-10 last:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: idx * 0.08 }}
          >
            {/* ── Mobile (always right-aligned dot, card to the left) ── */}
            <div className="sm:hidden flex items-start gap-3">
              <motion.button
                onClick={() => setSelected(item)}
                className="glass rounded-xl p-4 flex-1 text-right cursor-pointer transition-colors duration-300 hover:bg-white/[0.04]"
                whileTap={{ scale: 0.97 }}
              >
                <h3 className="text-sm font-semibold" style={{ color: 'rgba(230,220,245,0.82)' }}>
                  {item.title}
                </h3>
                {item.date && (
                  <p className="text-[10px] mt-1" style={{ color: 'rgba(180,170,200,0.4)' }}>{item.date}</p>
                )}
              </motion.button>

              {/* Dot */}
              <div className="flex-shrink-0 mt-4 relative z-10">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.8), rgba(212,160,185,0.8))',
                    boxShadow: '0 0 10px rgba(167,139,250,0.3)',
                  }}
                  whileHover={{ scale: 1.5 }}
                />
              </div>
            </div>

            {/* ── Desktop (alternating) ── */}
            <div className={`hidden sm:flex items-center ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-[calc(50%-20px)] ${idx % 2 === 0 ? '' : ''}`}>
                <motion.button
                  onClick={() => setSelected(item)}
                  className="glass rounded-xl p-5 w-full text-right cursor-pointer transition-colors duration-300 hover:bg-white/[0.04]"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-base font-semibold" style={{ color: 'rgba(230,220,245,0.82)' }}>
                    {item.title}
                  </h3>
                  {item.date && (
                    <p className="text-xs mt-1" style={{ color: 'rgba(180,170,200,0.35)' }}>{item.date}</p>
                  )}
                </motion.button>
              </div>

              <div className="relative z-10 mx-2 flex-shrink-0">
                <motion.div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(167,139,250,0.8), rgba(212,160,185,0.8))',
                    boxShadow: '0 0 12px rgba(167,139,250,0.3)',
                  }}
                  whileHover={{ scale: 1.6 }}
                />
              </div>

              <div className="w-[calc(50%-20px)]" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative glass-strong rounded-2xl p-8 sm:p-10 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full text-sm hover:bg-white/5 transition-colors"
                style={{ color: 'rgba(180,170,200,0.45)' }}
              >✕</button>

              <h3 className="text-xl font-bold text-gradient mb-1">{selected.title}</h3>
              {selected.date && (
                <p className="text-xs mb-5" style={{ color: 'rgba(180,170,200,0.35)' }}>{selected.date}</p>
              )}
              <div className="line-fade w-14 mb-5" />
              <p className="text-sm leading-loose" style={{ color: 'rgba(220,210,240,0.6)' }}>
                {selected.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
