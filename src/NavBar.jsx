import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import './NavBar.css';
import logo from "./assets/logo.png";

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Process',     href: '#process' },
  { label: 'Our Products',href: '#products' },
  { label: 'About Us',    href: '#about' },
  { label: 'Testimonials',href: '#testimonials' },
  { label: 'FAQs',        href: '#faqs' },
];

const logoVariants = {
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const linkContainerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const linkVariants = {
  hidden:  { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
};

const mobileLinkVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function NavBar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [lang, setLang]           = useState('En');
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const handleScroll = () => {
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      })
    }
    const handleMobileNavClick = (href) => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
          });
        }

        setTimeout(() => {
          setMenuOpen(false);
        }, 200);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'En' ? 'አማ' : 'En');
  const closeMenu  = () => setMenuOpen(false);

  const handleMobileNavClick = (e, href) => {
  e.preventDefault();

  const target = document.querySelector(href);

  if (target) {
    closeMenu();

    setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 250);
      }
    };

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar__inner container">

      
        <div className="navbar__logo-container">
          {/* ── LOGO ── */}
          <motion.a
            href="#home"
            className="navbar__logo"
            variants={logoVariants}
            onClick={closeMenu}
          >
            <img src= {logo} alt="logo" className='navbar__logo-icon' />
            <span className="navbar__logo-text">
              <span className="navbar__logo-primary">ETHIO</span>
              <span className="navbar__logo-accent"> NUG</span>
            </span>
          </motion.a>

            {/* Language Selector */}
            <motion.div
              className="navbar__lang-toggle"
              variants={linkVariants}
            >
              {/* Sliding Background */}
              <div
                className={`navbar__lang-slider ${
                  lang === "En" ? "left" : "right"
                }`}
              />

              {/* EN */}
              <button
                className={`navbar__lang-option ${
                  lang === "En" ? "active" : ""
                }`}
                onClick={() => setLang("En")}
              >
                En
              </button>

              {/* AMH */}
              <button
                className={`navbar__lang-option ${
                  lang === "Am" ? "active" : ""
                }`}
                onClick={() => setLang("Am")}
              >
                አማ
              </button>
            </motion.div>
        </div>
        {/* ── DESKTOP NAV ── */}
        <motion.nav
          className="navbar__links"
          role="navigation"
          aria-label="Main navigation"
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`navbar__link ${
                activeLink === link.href.replace('#', '') ? 'active' : ''
              }`}
              variants={linkVariants}
            >
              {link.label}
              <span className="navbar__link-underline" aria-hidden="true" />
            </motion.a>
          ))}
        </motion.nav>

        {/* ── DESKTOP ACTIONS ── */}
        <motion.div
          className="navbar__actions"
          variants={linkContainerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* CTA */}
          <motion.a
            href="#contact"
            className="navbar__cta"
            variants={linkVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.a>
        </motion.div>

        {/* ── HAMBURGER ── */}
        <motion.button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen
              ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              : <motion.span key="open"  initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="navbar__mobile-links" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="navbar__mobile-link"
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={(e) => {
                    handleMobileNavClick(e, link.href);
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile lang + CTA */}
              <motion.div
                className="navbar__mobile-footer"
                custom={navLinks.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <button className="navbar__lang-btn navbar__lang-btn--mobile" onClick={toggleLang}>
                  <Globe size={14} />
                  <span>En / አማ</span>
                </button>
                <a href="#contact" className="navbar__cta navbar__cta--mobile" onClick={(e) => {handleMobileNavClick(e, '#contact');}}>
                  Contact Us
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
