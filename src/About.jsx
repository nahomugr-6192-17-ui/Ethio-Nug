import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import about1 from './assets/about1.jpeg';
import about2 from './assets/about2.jpeg';
import './About.css';

/* ─── Slide data ─────────────────────────────── */
const SLIDES = [
  {
    id: 0,
    label: 'About Us',
    heading: 'ABOUT ETHIO-NUG',
    body: 'Ethio-Nug is dedicated to producing high-quality edible oil using carefully selected Ethiopian niger seeds. Combining modern processing technology with strict quality standards, we deliver pure, nutritious, and reliable cooking oil trusted by homes and businesses. Our mission is to provide healthy products while supporting local farmers and Ethiopian agriculture.',
    img: about1,
  },
  {
    id: 1,
    label: 'Our Promise',
    heading: 'TRUSTED PURITY YOU CAN TASTE',
    body: 'Ethio-Nug delivers premium edible oil crafted from high-quality Ethiopian niger seeds. Through modern refining methods and strict quality control, we ensure every bottle provides exceptional purity, freshness, and rich flavor trusted by families, restaurants, and businesses across Ethiopia.',
    img: about2,
  },
];

const AUTO_DELAY = 24000;

/* ─── Animation variants ─────────────────────── */
const textVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40, y: 12 }),
  center: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, y: -12, transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } }),
};

const imgFrontVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.94 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.94, transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } }),
};

const sectionFade = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Component ──────────────────────────────── */
export default function About() {
  const [index, setIndex]     = useState(0);
  const [direction, setDir]   = useState(1);
  const timerRef              = useRef(null);
  const touchStartX           = useRef(null);

  const sectionRef  = useRef(null);
  const inView      = useInView(sectionRef, { once: true, margin: '-80px' });

  const go = useCallback((step) => {
    setDir(step);
    setIndex((prev) => (prev + step + SLIDES.length) % SLIDES.length);
  }, []);

  /* Auto-advance */
  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), AUTO_DELAY);
  }, [go]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const navigate = (step) => { go(step); resetTimer(); };

  /* Swipe handlers */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) navigate(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];

  return (
    <section
      id="about"
      className="about"
      aria-label="About Ethio-Nug"
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="container about__container">

        {/* ── LEFT: Text ──────────────────────── */}
        <motion.div
          className="about__text-col"
          variants={sectionFade}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Desktop nav buttons */}
          <div className="about__nav" aria-label="Slide navigation">
            <motion.button
              className="about__nav-btn"
              onClick={() => navigate(-1)}
              aria-label="Previous slide"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </motion.button>
            <motion.button
              className="about__nav-btn"
              onClick={() => navigate(1)}
              aria-label="Next slide"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </motion.button>

            {/* Dot indicators */}
            <div className="about__dots" role="tablist">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  className={`about__dot${i === index ? ' about__dot--active' : ''}`}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); resetTimer(); }}
                  aria-label={`Go to slide ${i + 1}`}
                  role="tab"
                  aria-selected={i === index}
                />
              ))}
            </div>
          </div>

          {/* Animated text block */}
          <div className="about__text-wrap" aria-live="polite">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id}
                className="about__text-inner"
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="about__label">{slide.label}</span>
                <h2 className="about__heading">{slide.heading}</h2>
                <p className="about__body">{slide.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── RIGHT: Image Stack ──────────────── */}
        <motion.div
          className="about__image-col"
          variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="about__img-stack">
            {/* Back image (blurred, greyscale, offset) */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`back-${slide.id}`}
                className="about__img-back"
                custom={direction}
                variants={{
                  enter:  (d) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
                  center: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                  exit:   (d) => ({ opacity: 0, x: d > 0 ? -30 : 30, transition: { duration: 0.4 } }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <img src={slide.img} alt="" aria-hidden="true" className="about__img about__img--back" />
              </motion.div>
            </AnimatePresence>

            {/* Front image */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`front-${slide.id}`}
                className="about__img-front"
                custom={direction}
                variants={imgFrontVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <img src={slide.img} alt={slide.heading} className="about__img about__img--front" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
