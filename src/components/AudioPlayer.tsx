import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUSIC } from '../data/content';

export default function AudioPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ─────────────────────────────────────────────────
    //  مسیر فایل صوتی:
    //  فایل آهنگ خود را در public/music/our-song.mp3 بگذارید
    //  یا مسیر را در src/data/content.ts تغییر دهید
    // ─────────────────────────────────────────────────
    const a = new Audio(MUSIC.src);
    a.volume = vol;
    a.loop = true;
    audioRef.current = a;

    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.pause(); else a.play().catch(() => {});
    setPlaying(!playing);
  }, [playing]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value;
    if (audioRef.current) audioRef.current.currentTime = v;
    setTime(v);
  };

  const changeVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value;
    setVol(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-5 left-5 z-50 w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: playing
            ? 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(212,160,185,0.25))'
            : 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
        }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        animate={playing
          ? { boxShadow: ['0 0 12px rgba(167,139,250,0.15)', '0 0 22px rgba(212,160,185,0.25)', '0 0 12px rgba(167,139,250,0.15)'] }
          : {}
        }
        transition={playing ? { duration: 2.5, repeat: Infinity } : {}}
      >
        <svg className="w-4.5 h-4.5" style={{ color: 'rgba(220,210,240,0.7)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19V6l12-3v13M9 19c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2zm12-3c0 1.1-1.34 2-3 2s-3-.9-3-2 1.34-2 3-2 3 .9 3 2zM9 10l12-3" />
        </svg>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-18 left-5 z-50 glass-strong rounded-2xl p-5 w-64"
            dir="rtl"
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] mb-1" style={{ color: 'rgba(180,170,200,0.35)' }}>{MUSIC.label}</p>
            <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(230,220,245,0.8)' }}>{MUSIC.title}</p>
            <p className="text-[10px] mb-3" style={{ color: 'rgba(180,170,200,0.35)' }}>{MUSIC.artist}</p>

            {/* Progress */}
            <input type="range" min={0} max={dur || 100} value={time} onChange={seek} className="w-full mb-1" />
            <div className="flex justify-between text-[10px] mb-3" dir="ltr" style={{ color: 'rgba(180,170,200,0.3)' }}>
              <span>{fmt(time)}</span>
              <span>{dur ? fmt(dur) : '--:--'}</span>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between">
              <motion.button
                onClick={toggle}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(212,160,185,0.18))',
                  border: '1px solid rgba(167,139,250,0.18)',
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
              >
                {playing ? (
                  <svg className="w-4 h-4" style={{ color: 'var(--text-primary)' }} fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 mr-[-1px]" style={{ color: 'var(--text-primary)' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </motion.button>

              {/* Volume */}
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" style={{ color: 'rgba(180,170,200,0.35)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15.54 8.46a5 5 0 010 7.07M12 6l-4 4H4v4h4l4 4V6z" />
                </svg>
                <input type="range" min={0} max={1} step={0.01} value={vol} onChange={changeVol} className="w-14" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
