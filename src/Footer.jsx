import { motion } from 'framer-motion';
import { Phone, MapPin, Send, Mail } from 'lucide-react';
import logo from './assets/logo.png';
import './Footer.css';
import en from './Translation/en.js';
import am from './Translation/am.js';

const CONTACT_INFO = [
  { icon: Phone,  text: '+251 91 1979 899',      href: 'tel:+251911979899'           },
  { icon: MapPin, text: 'Addis Ababa, Ethiopia', href: 'https://maps.app.goo.gl/8jGuPBFsBjAXR8xn8?g_st=ac'                           },
  { icon: Send,   text: '@EthioNug (Telegram)',  href: 'https://t.me/stackminds'                           },
  { icon: Mail,   text: 'contact@ethionug.com',  href: 'mailto:contact@ethionug.com' },
];

export default function Footer({ lang }) {
  const t = lang === 'am' ? am : en;

  const NAV_LINKS = [
      { label: t.footer.navLinks.home, href: '#home' },
      { label: t.footer.navLinks.products, href: '#products' },
      { label: t.footer.navLinks.about, href: '#about' },
      { label: t.footer.navLinks.testimonials, href: '#testimonials' },
      { label: t.footer.navLinks.contact, href: '#contact' },
  ];

  return (
    <footer className="footer" aria-label="Site footer">

      {/* ── Main row ── */}
      <div className="container footer__main">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo-link">
            <img src={logo} alt="Ethio-Nug logo" className="footer__logo-img" />
            <span className="footer__logo-text">
              <span className="footer__logo-primary">{t.hero.name1}</span>
              <span className="footer__logo-accent">{t.hero.name2}</span>
            </span>
          </a>
          <p className="footer__slogan">{t.footer.slogan}</p>
          <p className="footer__desc">
            {t.footer.description}
          </p>
        </div>

        {/* Nav links */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <h4 className="footer__col-title">{t.footer.quickLinks}</h4>
          <ul className="footer__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="footer__nav-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact info */}
        <div className="footer__contact-col">
          <h4 className="footer__col-title">{t.footer.contact}</h4>
          <ul className="footer__contact-list">
            {CONTACT_INFO.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="footer__contact-item"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <item.icon size={14} strokeWidth={1.8} className="footer__contact-icon" />
                    <span>{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">{t.footer.copyright}</p>
          <p className="footer__powered">
            {t.footer.powered}{' '}
            <a
              href="https://t.me/stackminds"
              className="footer__powered-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              AhaduHub
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
