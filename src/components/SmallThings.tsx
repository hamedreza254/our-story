import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CH3 } from '../data/content';

export default function SmallThings() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-16 px-4">
      {/* Title */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold text-gradient text-center mb-4"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {CH3.title}
      </motion.h2>

      <motion.div
        className="line-fade-pink w-20 mx-auto mb-14"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* Cards grid */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CH3.cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <motion.button
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              className="glass rounded-2xl p-6 w-full text-right cursor-pointer transition-colors duration-300 hover:bg-white/[0.04]"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="text-lg block mb-2"
                style={{ color: 'rgba(212,160,185,0.5)' }}
              >{card.icon}</span>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: 'rgba(230,220,245,0.8)' }}
              >{card.heading}</h3>

              <AnimatePresence>
                {expandedIdx === i && (
                  <motion.p
                    className="text-xs leading-loose"
                    style={{ color: 'rgba(200,190,220,0.5)' }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {card.text}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
