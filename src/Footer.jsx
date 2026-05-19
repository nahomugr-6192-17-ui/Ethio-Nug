import { motion } from 'framer-motion';
import { Phone, MapPin, Send, Mail } from 'lucide-react';
import logo from './assets/logo.png';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'Our Products', href: '#products'      },
  { label: 'Our Story',    href: '#about'         },
  { label: 'Testimonials', href: '#testimonials'  },
  { label: 'Contact Us',   href: '#contact'       },
];

const CONTACT_INFO = [
  { icon: Phone,  text: '+251 91 1979 899',      href: 'tel:+251911979899'           },
  { icon: MapPin, text: 'Addis Ababa, Ethiopia', href: 'https://maps.app.goo.gl/8jGuPBFsBjAXR8xn8?g_st=ac'                           },
  { icon: Send,   text: '@EthioNug (Telegram)',  href: 'https://t.me/stackminds'                           },
  { icon: Mail,   text: 'contact@ethionug.com',  href: 'mailto:contact@ethionug.com' },
];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">

      {/* ── Main row ── */}
      <div className="container footer__main">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#home" className="footer__logo-link">
            <img src={logo} alt="Ethio-Nug logo" className="footer__logo-img" />
            <span className="footer__logo-text">
              <span className="footer__logo-primary">ETHIO</span>
              <span className="footer__logo-accent"> NUG</span>
            </span>
          </a>
          <p className="footer__slogan">From Ethiopian Farms to Your Family Table.</p>
          <p className="footer__desc">
            Premium edible oil crafted from carefully selected Ethiopian niger seeds —
            pure, natural, and trusted by homes and businesses across Ethiopia.
          </p>
        </div>

        {/* Nav links */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <h4 className="footer__col-title">Quick Links</h4>
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
          <h4 className="footer__col-title">Contact</h4>
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
          <p className="footer__copy">© 2026 Ethio-Nug. All Rights Reserved.</p>
          <p className="footer__powered">
            Powered by{' '}
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
