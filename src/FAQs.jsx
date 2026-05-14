import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle } from 'lucide-react';
import './FAQs.css';

/* ─── FAQ data (10 optimized) ────────────────── */
const FAQS = [
  {
    id: 1,
    q: 'Is Ethio-Nug 100% pure Noug oil?',
    a: 'Yes. Ethio-Nug contains 100% pure cold-pressed Noug (niger seed) oil with absolutely no additives, preservatives, or blending with other oils. What you pour is exactly what nature provides.',
  },
  {
    id: 2,
    q: 'Where are your seeds sourced?',
    a: 'Our Noug seeds are sourced directly from trusted Ethiopian farmers in prime agricultural regions. We maintain close relationships with our farmers to ensure consistent seed quality from field to bottle.',
  },
  {
    id: 3,
    q: 'Does the oil have a strong odor?',
    a: 'Our 6-stage cleaning process significantly reduces the natural earthy scent of raw niger seeds. The result is a clean, mild oil that is pleasant and easy to cook with every day.',
  },
  {
    id: 4,
    q: 'Is Ethio-Nug cold-pressed?',
    a: 'Yes. We use traditional cold-pressing methods to extract the oil without heat or chemicals — preserving its natural nutrients, rich flavor, and full nutritional integrity.',
  },
  {
    id: 5,
    q: 'How many cleaning stages does the oil go through?',
    a: 'Every batch passes through a strict 6-stage system: initial screening, fine sieving, brush cleaning, air separation, density sorting, and a final quality check — all before pressing begins.',
  },
  {
    id: 6,
    q: 'How do you ensure consistent quality?',
    a: 'Each production batch is tested at multiple checkpoints. Only seeds that pass every stage continue to extraction. Our team personally oversees every batch to ensure no bottle leaves below our standards.',
  },
  {
    id: 7,
    q: 'What can I cook with Ethio-Nug oil?',
    a: 'Ethio-Nug is ideal for frying, sautéing, salad dressings, and traditional Ethiopian dishes. Its clean, mild flavor makes it a versatile choice for both home kitchens and professional cooking.',
  },
  {
    id: 8,
    q: 'What bottle sizes are available?',
    a: 'We offer five sizes to suit every need: ½ L, 1 L, 3 L, 5 L, and 20 L. The 20 L container is designed for restaurants, hotels, and bulk buyers seeking volume pricing.',
  },
  {
    id: 9,
    q: 'Do you deliver and accept bulk orders?',
    a: 'Yes. We deliver across Ethiopia and welcome bulk orders from businesses, restaurants, and institutions. Contact us directly for volume pricing, delivery timelines, and special arrangements.',
  },
  {
    id: 10,
    q: 'How do I place an order or get in touch?',
    a: null, // rendered as special JSX below
  },
];

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

const LEFT_COL  = FAQS.slice(0, 5);
const RIGHT_COL = FAQS.slice(5, 10);

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
export default function FAQs() {
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
      setMobIdx((p) => (p + dir + FAQS.length) % FAQS.length);
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
          <motion.span className="faqs__label" variants={fadeUp}>FAQs</motion.span>
          <motion.h2  className="faqs__heading" variants={fadeUp}>
            Good Questions.<br />
            <span className="faqs__heading-accent">Honest Answers.</span>
          </motion.h2>
          <motion.p className="faqs__sub" variants={fadeUp}>
            We get these questions a lot, so we thought we would answer them here.
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
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="faqs__mobile-card"
            >
              <FaqCard
                item={FAQS[mobIdx]}
                isOpen={mobOpen === FAQS[mobIdx].id}
                onToggle={() =>
                  setMobOpen((p) =>
                    p === FAQS[mobIdx].id ? null : FAQS[mobIdx].id
                  )
                }
              />
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="faqs__dots" role="tablist">
            {FAQS.map((_, i) => (
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
