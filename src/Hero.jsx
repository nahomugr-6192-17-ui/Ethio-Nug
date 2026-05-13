import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import './Hero.css';
import animatedImg from "./assets/logo.png";

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.4 },
  },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

const badgeVariant = {
  hidden:  { opacity: 0, scale: 0.8, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Parallax: background moves slower than the scroll */
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      id="home"
      className="hero"
      ref={sectionRef}
      aria-label="Hero section"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="hero__bg"
        style={{ y: bgY }}
      />

      {/* ── Cinematic overlays ── */}
      <div className="hero__overlay hero__overlay--main"   aria-hidden="true" />
      <div className="hero__overlay hero__overlay--bottom" aria-hidden="true" />
      <div className="hero__overlay hero__overlay--top"    aria-hidden="true" />

      {/* ── Content ── */}
      <div className="container hero__container">

        {/* LEFT — Text Content */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div className="hero__badge" variants={badgeVariant}>
            <span className="hero__badge-dot" aria-hidden="true" />
            <span>Premium Ethiopian Niger Oil</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 className="hero__headline" variants={fadeUp}>
            From Ethiopian Farms<br />
            <span className="hero__headline-accent">To Your Family Table</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p className="hero__subheadline" variants={fadeUp}>
            Premium edible oil made from carefully selected Ethiopian niger seeds,
            refined for purity, freshness, and rich natural taste.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero__ctas" variants={fadeUp}>
            <motion.a
              href="#about"
              className="hero__btn hero__btn--primary"
              whileHover={{ scale: 1.045, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
            >
              <BookOpen size={17} strokeWidth={2} />
              <span>Discover Our Story</span>
            </motion.a>

            <motion.a
              href="#products"
              className="hero__btn hero__btn--secondary"
              whileHover={{ scale: 1.045, x: 4 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
            >
              <span>View Products</span>
              <ArrowRight size={17} strokeWidth={2.5} className="hero__btn-arrow" />
            </motion.a>
          </motion.div>

          {/* Trust stats */}
          <motion.div className="hero__stats" variants={fadeUp}>
            {[
              { value: '100%', label: 'Pure Niger Oil' },
              { value: '15+',  label: 'Years of Excellence' },
              { value: '50K+', label: 'Happy Families' },
            ].map(({ value, label }) => (
              <div className="hero__stat" key={label}>
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Floating Bottle */}
        <motion.div
          className="hero__bottle-wrapper"
          variants={fadeRight}
          initial="hidden"
          animate="visible"
        >
          {/* Glow rings */}
          <div className="hero__bottle-glow"     aria-hidden="true" />
          <div className="hero__bottle-glow-2"   aria-hidden="true" />

          {/* Floating & rotating bottle */}
          <motion.div
            className="hero__bottle"
            animate={{
              y:      [0, -18, 0],
              rotate: [-1.5, 1.5, -1.5],
            }}
            transition={{
              duration: 5.5,
              repeat:   Infinity,
              ease:     'easeInOut',
            }}
          >
            <img
              src={animatedImg}
              alt="Ethio-Nug Premium Niger Oil Bottle"
              className="hero__bottle-img"
            />
          </motion.div>

          {/* Soft shadow beneath bottle */}
          <motion.div
            className="hero__bottle-shadow"
            animate={{ scaleX: [1, 0.82, 1], opacity: [0.55, 0.3, 0.55] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* Floating badge card */}
          <motion.div
            className="hero__floating-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__floating-card-icon">✦</span>
            <div>
              <p className="hero__floating-card-title">Farm Fresh</p>
              <p className="hero__floating-card-sub">Sourced &amp; Refined in Ethiopia</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.span
          className="hero__scroll-dot"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
