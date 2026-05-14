import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import avatar1 from './assets/avatar1.png';
import avatar2 from './assets/avatar2.png';
import avatar3 from './assets/avatar3.png';
import './Testimonials.css';

/* ─── Data ────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Selamawit Tadesse',
    role: 'Home Cook · Addis Ababa',
    avatar: avatar1,
    rating: 5,
    text: 'Ethio-Nug has completely changed the way I cook. The purity and freshness are unmatched — my family immediately noticed the difference in taste. I will never switch to another brand.',
  },
  {
    id: 2,
    name: 'Bekele Haile',
    role: 'Restaurant Owner · Hawassa',
    avatar: avatar2,
    rating: 5,
    text: 'As a restaurant owner, quality matters above everything. Ethio-Nug delivers consistent purity and rich flavor every time. My customers compliment the food and I owe much of that to this oil.',
  },
  {
    id: 3,
    name: 'Tigist Alemu',
    role: 'Head Chef · Dire Dawa',
    avatar: avatar3,
    rating: 5,
    text: 'I have been using Ethio-Nug for over two years. The 6-step cleaning process really shows in the final product — clean, light, and full of natural flavor. Highly recommended for any professional kitchen.',
  },
  {
    id: 4,
    name: 'Dawit Mekonnen',
    role: 'Hotel Procurement · Bahir Dar',
    avatar: avatar2,
    rating: 5,
    text: 'We supply Ethio-Nug oil to all our hotel kitchens. Delivery is always on time, quality is consistently excellent, and the 20L bulk option is perfect for our volume. A truly trustworthy supplier.',
  },
  {
    id: 5,
    name: 'Meron Girma',
    role: 'Food Business Owner · Jimma',
    avatar: avatar1,
    rating: 5,
    text: 'Ethio-Nug proves that local can mean premium. The oil is clean, golden, and completely natural. Supporting an Ethiopian brand this committed to quality is something I am proud to do every day.',
  },
];

const AUTO_DELAY   = 15000;
const DESKTOP_COLS = 3;
const EXTENDED     = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]; // triple for infinite effect

/* ─── Star row ────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="tcard__stars" aria-label={`${count} stars out of 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} className="tcard__star" />
      ))}
    </div>
  );
}

/* ─── Card ────────────────────────────────────── */
function TCard({ item }) {
  return (
    <motion.article
      className="tcard"
      whileHover={{ y: -7 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Quote size={26} strokeWidth={1.5} className="tcard__quote" aria-hidden="true" />

      <div className="tcard__top">
        <div className="tcard__name-tab">
          <span className="tcard__name">{item.name}</span>
          <span className="tcard__role">{item.role}</span>
        </div>
        <div className="tcard__avatar-ring">
          <img src={item.avatar} alt={item.name} className="tcard__avatar" />
        </div>
      </div>

      <Stars count={item.rating} />

      <p className="tcard__body">{item.text}</p>
    </motion.article>
  );
}

/* ─── Main component ──────────────────────────── */
export default function Testimonials() {
  /* Responsive mode */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* Desktop offset (index into EXTENDED array) */
  const [deskOffset, setDeskOffset] = useState(TESTIMONIALS.length); // start at middle copy
  /* Mobile index */
  const [mobIdx,  setMobIdx]  = useState(0);
  const [mobDir,  setMobDir]  = useState(1);

  const timerRef    = useRef(null);
  const touchStartX = useRef(null);

  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const bodyRef    = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: '-80px' });

  /* Desktop advance — wraps silently within the extended array */
  const advanceDesk = useCallback((step = 1) => {
    setDeskOffset((prev) => {
      let next = prev + step;
      if (next >= TESTIMONIALS.length * 2) next = TESTIMONIALS.length;
      if (next < TESTIMONIALS.length) next = TESTIMONIALS.length * 2 - 1;
      return next;
    });
  }, []);

  const advanceMob = useCallback(() => {
    setMobDir(1);
    setMobIdx((p) => (p + 1) % TESTIMONIALS.length);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (isMobile) advanceMob();
      else advanceDesk(1);
    }, AUTO_DELAY);
  }, [isMobile, advanceMob, advanceDesk]);

  useEffect(() => { resetTimer(); return () => clearInterval(timerRef.current); }, [resetTimer]);

  /* Swipe */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      const dir = dx > 0 ? 1 : -1;
      setMobDir(dir);
      setMobIdx((p) => (p + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
      resetTimer();
    }
    touchStartX.current = null;
  };

  /* Desktop translateX: each card is 100/DESKTOP_COLS % wide */
  const cardPct  = 100 / DESKTOP_COLS;
  const trackX   = -((deskOffset - TESTIMONIALS.length) * cardPct); // offset from middle copy start

  return (
    <section id="testimonials" className="testimonials" aria-label="Customer testimonials">
      <div className="container">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="testimonials__label">Testimonials</span>
          <h2 className="testimonials__heading">What Our Customers Say</h2>
          <p className="testimonials__sub">
            Trusted by families, restaurants, and businesses across Ethiopia.
          </p>
        </motion.div>

        {/* Desktop Carousel Navigation */}
        {!isMobile && (
          <motion.div
            className="testimonials__desktop-nav"
            initial={{ opacity: 0, x: -20 }}
            animate={bodyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.button
              className="testimonials__nav-btn"
              onClick={() => { advanceDesk(-1); resetTimer(); }}
              aria-label="Previous testimonials"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </motion.button>
            <motion.button
              className="testimonials__nav-btn"
              onClick={() => { advanceDesk(1); resetTimer(); }}
              aria-label="Next testimonials"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              <ChevronRight size={20} strokeWidth={2} />
            </motion.button>
          </motion.div>
        )}

        {/* Desktop carousel */}
        {!isMobile && (
          <motion.div
            ref={bodyRef}
            className="testimonials__viewport"
            initial={{ opacity: 0, y: 40 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <motion.div
              className="testimonials__track"
              style={{ width: `${(EXTENDED.length / DESKTOP_COLS) * 100}%` }}
              animate={{ x: `${trackX / (EXTENDED.length / DESKTOP_COLS)}%` }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {EXTENDED.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className="testimonials__slot"
                  style={{ width: `${100 / EXTENDED.length}%` }}
                >
                  <TCard item={item} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Mobile carousel */}
        {isMobile && (
          <div
            ref={bodyRef}
            className="testimonials__mobile"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={mobDir}>
              <motion.div
                key={mobIdx}
                custom={mobDir}
                initial={(d) => ({ opacity: 0, x: d > 0 ? 70 : -70 })}
                animate={{ opacity: 1, x: 0 }}
                exit={(d) => ({ opacity: 0, x: d > 0 ? -70 : 70 })}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="testimonials__mobile-card"
              >
                <TCard item={TESTIMONIALS[mobIdx]} />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="testimonials__dots" role="tablist">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === mobIdx}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`testimonials__dot${i === mobIdx ? ' testimonials__dot--on' : ''}`}
                  onClick={() => {
                    setMobDir(i > mobIdx ? 1 : -1);
                    setMobIdx(i);
                    resetTimer();
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
