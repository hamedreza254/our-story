import { useState, useCallback } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import StarField from './components/StarField';
import Opening from './components/Opening';
import Constellation from './components/Constellation';
import MemoryTimeline from './components/MemoryTimeline';
import SmallThings from './components/SmallThings';
import Envelope from './components/Envelope';
import AudioPlayer from './components/AudioPlayer';
import FinalScene from './components/FinalScene';
import { CH1, CH2, CH3, CH4 } from './data/content';

// ────────────────────────────────────────────────
//  Sections the user navigates through like a book
// ────────────────────────────────────────────────
type Section =
  | 'landing'
  | 'ch1'
  | 'ch2'
  | 'timeline'
  | 'ch3'
  | 'letter'
  | 'ch4'
  | 'finale';

const SECTION_ORDER: Section[] = [
  'landing', 'ch1', 'ch2', 'timeline', 'ch3', 'letter', 'ch4', 'finale',
];

const PERSIAN_SECTION_LABELS: Record<Section, string> = {
  landing: '',
  ch1: CH1.label,
  ch2: CH2.label,
  timeline: 'لحظه‌ها',
  ch3: CH3.label,
  letter: 'نامه',
  ch4: CH4.label,
  finale: 'پایان',
};

// ── Page transition variants ──
const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.97,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.97,
  }),
};

// ── Reusable decorative divider ──
function Divider() {
  return (
    <motion.div
      className="flex items-center justify-center py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.15))' }} />
        <motion.span
          className="text-xs"
          style={{ color: 'rgba(200,190,220,0.2)' }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        >✦</motion.span>
        <div className="w-14 h-px" style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.15), transparent)' }} />
      </div>
    </motion.div>
  );
}

// ═══════ Main App ═══════
export default function App() {
  const [section, setSection] = useState<Section>('landing');
  const [dir, setDir] = useState(0);

  const idx = SECTION_ORDER.indexOf(section);
  const isFirst = idx <= 1; // ch1 is the first navigable
  const isLast = idx === SECTION_ORDER.length - 1;

  const goTo = useCallback((s: Section, direction: number) => {
    setDir(direction);
    setSection(s);
    window.scrollTo({ top: 0 });
  }, []);

  const goNext = useCallback(() => {
    if (isLast) return;
    goTo(SECTION_ORDER[idx + 1], 1);
  }, [idx, isLast, goTo]);

  const goPrev = useCallback(() => {
    if (idx <= 1) return;
    goTo(SECTION_ORDER[idx - 1], -1);
  }, [idx, goTo]);

  // Swipe support
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 60) goNext();
    else if (info.offset.x < -60) goPrev();
  };

  const handleStart = useCallback(() => {
    goTo('ch1', 1);
  }, [goTo]);

  const progress = idx <= 0 ? 0 : ((idx) / (SECTION_ORDER.length - 1)) * 100;

  // ── Chapter page wrapper ──
  const ChapterPage = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      key={section}
      custom={dir}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 touch-pan-y"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden" dir="rtl">
      <StarField brightness={section === 'landing' ? 1 : section === 'finale' ? 1.2 : 0.75} />

      {/* Progress bar */}
      {section !== 'landing' && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(90deg, rgba(167,139,250,0.5), rgba(212,160,185,0.5))' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Music player */}
      {section !== 'landing' && <AudioPlayer />}

      <AnimatePresence mode="wait" custom={dir}>
        {/* ═══ LANDING ═══ */}
        {section === 'landing' && (
          <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Opening onStart={handleStart} />
          </motion.div>
        )}

        {/* ═══ CHAPTER 1 ═══ */}
        {section === 'ch1' && (
          <ChapterPage>
            <motion.span
              className="text-xs mb-3 tracking-wider"
              style={{ color: 'rgba(200,190,220,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >{CH1.label}</motion.span>

            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gradient text-center mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >«{CH1.title}»</motion.h2>

            <div className="glass-strong rounded-2xl p-8 sm:p-12 max-w-xl w-full text-center">
              <motion.p
                className="text-base sm:text-lg leading-loose mb-6"
                style={{ color: 'rgba(220,210,240,0.65)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >{CH1.p1}</motion.p>

              <Divider />

              <motion.p
                className="text-sm sm:text-base leading-loose"
                style={{ color: 'rgba(200,190,220,0.5)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >{CH1.p2}</motion.p>
            </div>
          </ChapterPage>
        )}

        {/* ═══ CHAPTER 2 ═══ */}
        {section === 'ch2' && (
          <ChapterPage>
            <motion.span
              className="text-xs mb-3 tracking-wider"
              style={{ color: 'rgba(200,190,220,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >{CH2.label}</motion.span>

            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gradient text-center mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >«{CH2.title}»</motion.h2>

            <motion.p
              className="text-sm text-center mb-10 max-w-md"
              style={{ color: 'rgba(200,190,220,0.45)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >{CH2.description}</motion.p>

            <Constellation />

            <motion.p
              className="text-[10px] mt-6 hidden sm:block"
              style={{ color: 'rgba(180,170,200,0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >ماوس را روی ستاره‌ها ببرید</motion.p>
            <motion.p
              className="text-[10px] mt-6 sm:hidden"
              style={{ color: 'rgba(180,170,200,0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >روی ستاره‌ها بزنید</motion.p>
          </ChapterPage>
        )}

        {/* ═══ TIMELINE ═══ */}
        {section === 'timeline' && (
          <ChapterPage>
            <div className="w-full max-w-2xl">
              <MemoryTimeline />
            </div>
          </ChapterPage>
        )}

        {/* ═══ CHAPTER 3 ═══ */}
        {section === 'ch3' && (
          <ChapterPage>
            <div className="w-full max-w-2xl">
              <SmallThings />
            </div>
          </ChapterPage>
        )}

        {/* ═══ LETTER ═══ */}
        {section === 'letter' && (
          <ChapterPage>
            <div className="w-full max-w-2xl">
              <Envelope />
            </div>
          </ChapterPage>
        )}

        {/* ═══ CHAPTER 4 ═══ */}
        {section === 'ch4' && (
          <ChapterPage>
            <motion.span
              className="text-xs mb-3 tracking-wider"
              style={{ color: 'rgba(200,190,220,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >{CH4.label}</motion.span>

            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gradient text-center mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >{CH4.title}</motion.h2>

            <div className="glass-strong rounded-2xl p-8 sm:p-12 max-w-xl w-full text-center">
              <motion.p
                className="text-base sm:text-lg leading-loose mb-5"
                style={{ color: 'rgba(220,210,240,0.65)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >{CH4.p1}</motion.p>

              <Divider />

              <motion.p
                className="text-sm sm:text-base leading-loose mb-5"
                style={{ color: 'rgba(200,190,220,0.5)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >{CH4.p2}</motion.p>

              <motion.p
                className="text-sm leading-loose text-gradient-subtle font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >{CH4.p3}</motion.p>
            </div>
          </ChapterPage>
        )}

        {/* ═══ FINALE ═══ */}
        {section === 'finale' && (
          <motion.div
            key="finale"
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <FinalScene />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ Navigation Controls ═══ */}
      {section !== 'landing' && (
        <div className="fixed bottom-5 right-0 left-0 z-40 flex justify-center pointer-events-none">
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-full pointer-events-auto"
            style={{
              background: 'rgba(10,8,22,0.55)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Prev */}
            <motion.button
              onClick={goPrev}
              disabled={isFirst}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all disabled:opacity-15 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--text-primary)',
              }}
              whileHover={!isFirst ? { scale: 1.06 } : {}}
              whileTap={!isFirst ? { scale: 0.96 } : {}}
            >
              <span className="flex items-center gap-1.5">
                فصل قبلی
                <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
            </motion.button>

            {/* Page dots */}
            <div className="flex gap-1.5 mx-1">
              {SECTION_ORDER.slice(1).map((s, i) => (
                <button
                  key={s}
                  onClick={() => goTo(s, i + 1 > idx ? 1 : -1)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: s === section
                      ? 'linear-gradient(135deg, rgba(167,139,250,0.8), rgba(212,160,185,0.8))'
                      : 'rgba(255,255,255,0.12)',
                    transform: s === section ? 'scale(1.7)' : 'scale(1)',
                  }}
                  aria-label={PERSIAN_SECTION_LABELS[s]}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={goNext}
              disabled={isLast}
              className="group px-4 py-2 rounded-full text-xs font-medium transition-all disabled:opacity-15 disabled:cursor-not-allowed overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, rgba(167,139,250,0.12), rgba(212,160,185,0.12))',
                border: '1px solid rgba(167,139,250,0.15)',
                color: 'var(--text-primary)',
              }}
              whileHover={!isLast ? { scale: 1.06 } : {}}
              whileTap={!isLast ? { scale: 0.96 } : {}}
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(212,160,185,0.2))' }}
              />
              <span className="relative flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {section === 'ch4' ? 'پایان' : 'ادامه'}
              </span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}
