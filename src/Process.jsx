import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ScanSearch,
  Filter,
  Wind,
  Scale,
  BadgeCheck,
  Brush,
} from 'lucide-react';
import './Process.css';
import en from './Translation/en.js';
import am from './Translation/am.js';
import LocalizedText from './LocalizedText.jsx';

/* ─── Animation variants ────────────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = (isLeft) => ({
  hidden:  { opacity: 0, x: isLeft ? -50 : 50, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
});

const dotVariant = {
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: 'backOut' } },
};

/* ─── Single Process Card ───────────────────────────────────────── */
function ProcessCard({ step, index }) {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const isLeft  = index % 2 === 0;
  const Icon    = step.icon;

  return (
    <div
      ref={ref}
      className={`process__row ${isLeft ? 'process__row--left' : 'process__row--right'}`}
    >
      {/* ── card side ── */}
      <motion.div
        className="process__card-wrapper"
        variants={cardVariants(isLeft)}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div
          className="process__card"
          whileHover="hovered"
          initial="rest"
          animate="rest"
        >
          {/* Card header */}
          <div className="process__card-header">
            <motion.div
              className="process__icon-wrap"
              variants={{
                rest:    { color: 'var(--color-gold-500)' },
                hovered: { color: 'var(--color-neutral-900)', transition: { duration: 0.25 } },
              }}
            >
              <Icon size={22} strokeWidth={1.8} />
            </motion.div>

            <div className="process__title-group">
              <motion.span
                className="process__step-num"
                variants={{
                  rest:    { color: 'var(--color-gold-500)' },
                  hovered: { color: 'rgba(0,0,0,0.4)', transition: { duration: 0.25 } },
                }}
              >
                {step.number}
              </motion.span>
              <motion.h3
                className="process__card-title"
                variants={{
                  rest:    { color: 'var(--color-neutral-900)' },
                  hovered: { color: 'var(--color-neutral-900)', transition: { duration: 0.25 } },
                }}
              >
                {step.title}
              </motion.h3>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            className="process__card-divider"
            variants={{
              rest:    { backgroundColor: 'var(--color-neutral-200)' },
              hovered: { backgroundColor: 'rgba(0,0,0,0.15)', transition: { duration: 0.25 } },
            }}
          />

          {/* Description */}
          <motion.p
            className="process__card-desc"
            variants={{
              rest:    { color: 'var(--color-neutral-500)' },
              hovered: { color: 'rgba(0,0,0,0.65)', transition: { duration: 0.25 } },
            }}
          >
            {step.description}
          </motion.p>

          {/* Hover background overlay — sits behind content via z-index */}
          <motion.div
            className="process__card-bg"
            variants={{
              rest:    { opacity: 0 },
              hovered: { opacity: 1, transition: { duration: 0.3 } },
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── center column: dot ── */}
      <div className="process__spine">
        <motion.div
          className="process__dot"
          variants={dotVariant}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className="process__dot-inner" />
        </motion.div>
      </div>

      {/* ── empty side (keeps grid balanced) ── */}
      <div className="process__spacer" aria-hidden="true" />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Process({ lang }) {
  const t = lang === 'am' ? am : en;
  const STEPS = [
    {
      number: '01',
      icon: ScanSearch,
      title: t.process.steps.screening.title,
      description: t.process.steps.screening.description,
    },
    {
      number: '02',
      icon: Filter,
      title: t.process.steps.sieving.title,
      description: t.process.steps.sieving.description,
    },
    {
      number: '03',
      icon: Brush,
      title: t.process.steps.brush.title,
      description: t.process.steps.brush.description,
    },
    {
      number: '04',
      icon: Wind,
      title: t.process.steps.air.title,
      description: t.process.steps.air.description,
    },
    {
      number: '05',
      icon: Scale,
      title: t.process.steps.density.title,
      description: t.process.steps.density.description,
    },
    {
      number: '06',
      icon: BadgeCheck,
      title: t.process.steps.final.title,
      description: t.process.steps.final.description,
    },
  ];
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: '-80px' });

  return (
    <section id="process" className="process" aria-label="Our production process">
      <div className="container">

        {/* ── Section Header ── */}
        <motion.div
          ref={headerRef}
          className="process__header"
          variants={sectionVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.span className="process__label" variants={fadeUp}>
            <LocalizedText lang={lang} type="heading">
              {t.process.label}
            </LocalizedText>
          </motion.span>

          <motion.h2 className="process__heading" variants={fadeUp}>
            <LocalizedText lang={lang} type="heading">
              {t.process.headingTop}<br />
            </LocalizedText>
            <span className="process__heading-accent">
              <LocalizedText lang={lang} type="heading">
                {t.process.headingAccent}
              </LocalizedText>
            </span>
          </motion.h2>

          <motion.p className="process__subheading" variants={fadeUp}>
            <LocalizedText lang={lang} type="body">
              {t.process.subheading}
            </LocalizedText>
          </motion.p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="process__timeline" role="list">
          {/* Continuous spine line */}
          <div className="process__spine-line" aria-hidden="true" />

          {STEPS.map((step, i) => (
            <div key={step.number} role="listitem">
              <ProcessCard step={step} index={i} />
            </div>
          ))}
        </div>

        {/* ── Bottom Story Block ── */}
        <motion.div
          ref={storyRef}
          className="process__story"
          variants={sectionVariants}
          initial="hidden"
          animate={storyInView ? 'visible' : 'hidden'}
        >
          <motion.div className="process__story-card" variants={fadeUp}>
            <motion.span className="process__label process__label--center" variants={fadeUp}>
              <LocalizedText lang={lang} type="heading">
                {t.process.commitmentLabel}
              </LocalizedText>
            </motion.span>

            <motion.h2 className="process__story-heading" variants={fadeUp}>
              <LocalizedText lang={lang} type="heading">
                {t.process.commitmentHeading}
              </LocalizedText>
            </motion.h2>

            <motion.p className="process__story-text" variants={fadeUp}>
              <LocalizedText lang={lang} type="body">
                {t.process.commitmentText}
              </LocalizedText>
            </motion.p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}