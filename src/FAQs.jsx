import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle } from 'lucide-react';
import './FAQs.css';
import en from './Translation/en.js';
import am from './Translation/am.js';
import LocalizedText from './LocalizedText.jsx';

const CONTACT_JSX = (
  <span className="faq__contact-links">
    You can reach us by phone or WhatsApp to place your order or ask questions.{' '}
    <a href="tel:+251911979899"  className="faq__link"><Phone size={13} strokeWidth={2}/> +251 911 979 899</a>{' · '}
    <a href="tel:+251982323334"  className="faq__link"><Phone size={13} strokeWidth={2}/> +251 982 323 334</a>{' · '}
    <a href="https://wa.me/17025610844" target="_blank" rel="noopener noreferrer" className="faq__link faq__link--wa">
      <MessageCircle size={13} strokeWidth={2}/> WhatsApp
    </a>
  </span>
);

/* ─── Single FAQ card ────────────────────────── */
function FaqCard({ item, isOpen, onToggle }) {
  const answer = item.a ?? CONTACT_JSX;
  return (
    <motion.div
      className={`faq__card${isOpen ? ' faq__card--open' : ''}`}
      animate={
        isOpen
          ? { scale: 1.02, boxShadow: 'var(--shadow-gold)' }
          : { scale: 1,    boxShadow: 'var(--shadow-sm)' }
      }
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__question">{item.q}</span>
        <motion.span
          className="faq__icon"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronRight size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="faq__answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────── */
export default function FAQs({ lang }) {
  const t = lang === 'am' ? am : en;

  const CONTACT_JSX = (
    <span className="faq__contact-links">
      <LocalizedText lang={lang} type="body">
        {t.faqs.contactText}{' '}
      </LocalizedText>
      
      <a href="tel:+251911979899" className="faq__link">
        <Phone size={13} strokeWidth={2}/>
        +251 911 979 899
      </a>

      {' · '}

      <a href="tel:+251982323334" className="faq__link">
        <Phone size={13} strokeWidth={2}/>
        +251 982 323 334
      </a>

      {' · '}

      <a
        href="https://wa.me/17025610844"
        target="_blank"
        rel="noopener noreferrer"
        className="faq__link faq__link--wa"
      >
        <MessageCircle size={13} strokeWidth={2}/>
        WhatsApp
      </a>
    </span>
  );

  const FAQS = t.faqs.questions.map((item) => ({
    ...item,
    a: item.a === null ? CONTACT_JSX : item.a,
  }));

  const FAQ_GROUPS = [
    FAQS.slice(0, 5),
    FAQS.slice(5, 10),
  ];

  const LEFT_COL  = FAQS.slice(0, 5);
  const RIGHT_COL = FAQS.slice(5, 10);

  const [openId,  setOpenId]  = useState(null);
  const [mobIdx,  setMobIdx]  = useState(0);
  const [mobOpen, setMobOpen] = useState(null);
  const touchStartX = useRef(null);

  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const bodyRef    = useRef(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: '-80px' });

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  /* Mobile swipe */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      const dir = dx > 0 ? 1 : -1;
      setMobIdx((p) => (p + dir + FAQ_GROUPS.length) % FAQ_GROUPS.length);
      setMobOpen(null);
    }
    touchStartX.current = null;
  };

  const headerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };
  const colVariant = (delay) => ({
    hidden:  { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
  });

  return (
    <section id="faqs" className="faqs" aria-label="Frequently asked questions">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="faqs__header"
          variants={headerStagger}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.span className="faqs__label" variants={fadeUp}>
            <LocalizedText lang={lang} type="heading">
              {t.faqs.label}
            </LocalizedText>
          </motion.span>
          <motion.h2  className="faqs__heading" variants={fadeUp}>
            <LocalizedText lang={lang} type="heading">
              {t.faqs.headingTop}<br />
            </LocalizedText>
            <span className="faqs__heading-accent">
              <LocalizedText lang={lang} type="heading">
                {t.faqs.headingAccent}
              </LocalizedText>
            </span>
          </motion.h2>
          <motion.p className="faqs__sub" variants={fadeUp}>
            <LocalizedText lang={lang} type="body">
              {t.faqs.subheading}
            </LocalizedText>
          </motion.p>
        </motion.div>

        {/* ── Desktop 2-column grid ── */}
        <div ref={bodyRef} className="faqs__desktop">
          <motion.div
            className="faqs__col"
            variants={colVariant(0.1)}
            initial="hidden"
            animate={bodyInView ? 'visible' : 'hidden'}
          >
            {LEFT_COL.map((item) => (
              <FaqCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </motion.div>

          <motion.div
            className="faqs__col"
            variants={colVariant(0.2)}
            initial="hidden"
            animate={bodyInView ? 'visible' : 'hidden'}
          >
            {RIGHT_COL.map((item) => (
              <FaqCard
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Mobile carousel ── */}
        <div
          className="faqs__mobile"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="faqs__mobile-card"
            >
              {FAQ_GROUPS[mobIdx].map((item) => (
                <FaqCard
                  key={item.id}
                  item={item}
                  isOpen={mobOpen === item.id}
                  onToggle={() =>
                    setMobOpen((p) => (p === item.id ? null : item.id))
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="faqs__dots" role="tablist">
            {FAQ_GROUPS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === mobIdx}
                aria-label={`FAQ ${i + 1}`}
                className={`faqs__dot${i === mobIdx ? ' faqs__dot--on' : ''}`}
                onClick={() => { setMobIdx(i); setMobOpen(null); }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
