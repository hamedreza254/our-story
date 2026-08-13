import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINALE, EASTER_EGG } from '../data/content';

export default function FinalScene() {
  const [eggClicks, setEggClicks] = useState(0);
  const [showEgg, setShowEgg] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStarClick = () => {
    const next = eggClicks + 1;
    setEggClicks(next);

    // Reset counter after 3s of inactivity
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setEggClicks(0), 3000);

    if (next >= EASTER_EGG.clicksNeeded) {
      setShowEgg(true);
      setEggClicks(0);
    }
  };

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
      {/* Bright star */}
      <motion.button
        onClick={handleStarClick}
        className="relative mb-16 cursor-pointer select-none outline-none"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 100, height: 100,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(212,160,185,0.2), transparent 65%)',
            filter: 'blur(8px)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Star text */}
        <motion.span
          className="relative text-3xl block"
          animate={{
            textShadow: [
              '0 0 8px rgba(212,160,185,0.2)',
              '0 0 20px rgba(212,160,185,0.45)',
              '0 0 8px rgba(212,160,185,0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦
        </motion.span>
      </motion.button>

      {/* Line 1 */}
      <motion.p
        className="text-lg sm:text-xl font-semibold text-center mb-6"
        style={{ color: 'rgba(230,220,245,0.65)' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {FINALE.line1}
      </motion.p>

      {/* Line 2 */}
      <motion.p
        className="text-sm sm:text-base text-center mb-6"
        style={{ color: 'rgba(200,190,220,0.45)' }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        {FINALE.line2}
      </motion.p>

      {/* Line 3 */}
      <motion.p
        className="text-base sm:text-lg text-gradient-subtle font-medium text-center mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 2.2 }}
      >
        {FINALE.line3}
      </motion.p>

      {/* Heart */}
      <motion.div
        className="text-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 3 }}
      >
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.18, 1, 1.18, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
        >
          ❤️
        </motion.span>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="mt-20 text-[10px]"
        style={{ color: 'rgba(180,170,200,0.15)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3.5 }}
      >
        ساخته شده با عشق
      </motion.p>

      {/* ── Easter Egg Modal ── */}
      <AnimatePresence>
        {showEgg && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowEgg(false)}
            />
            <motion.div
              className="relative glass-strong rounded-2xl p-8 max-w-sm w-full text-center"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-3xl block mb-4">🌟</span>
              <p className="text-base font-semibold mb-2" style={{ color: 'rgba(230,220,245,0.85)' }}>
                {EASTER_EGG.line1}
              </p>
              <p className="text-sm" style={{ color: 'rgba(200,190,220,0.5)' }}>
                {EASTER_EGG.line2}
              </p>
              <button
                onClick={() => setShowEgg(false)}
                className="mt-6 text-xs px-5 py-2 rounded-full"
                style={{
                  background: 'rgba(167,139,250,0.1)',
                  border: '1px solid rgba(167,139,250,0.15)',
                  color: 'rgba(200,190,220,0.6)',
                }}
              >
                باشه :)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
