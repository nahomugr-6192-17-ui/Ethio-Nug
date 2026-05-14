import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Send, MessageCircle, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const INFO_CARDS = [
  {
    id: 'phone', icon: Phone, label: 'Call Us',
    primary: '+251 911 979 899', secondary: '+251 982 323 334',
    href: 'tel:+251911979899', badge: 'Recommended',
  },
  {
    id: 'location', icon: MapPin, label: 'Our Location',
    primary: 'Addis Ababa, Ethiopia', secondary: 'Available for visits by appointment',
    href: 'https://maps.app.goo.gl/8jGuPBFsBjAXR8xn8?g_st=ac', badge: null,
  },
  {
    id: 'telegram', icon: Send, label: 'Telegram',
    primary: '@EthioNug', secondary: 'Message us on Telegram',
    href: 'https://t.me/stackminds', badge: null,
  },
  {
    id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp',
    primary: '+1 702 561 0844', secondary: 'Chat with us on WhatsApp',
    href: 'https://wa.me/17025610844', badge: null,
  },
];

function InfoCard({ icon: Icon, label, primary, secondary, href, badge }) {
  const isExternal = href.startsWith('http');
  return (
    <motion.a
      href={href}
      className="cinfo"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cinfo__icon"><Icon size={20} strokeWidth={1.8} /></div>
      <div className="cinfo__body">
        <span className="cinfo__label">
          {label}
          {badge && <span className="cinfo__badge">{badge}</span>}
        </span>
        <span className="cinfo__primary">{primary}</span>
        {secondary && <span className="cinfo__secondary">{secondary}</span>}
      </div>
    </motion.a>
  );
}

function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="cform__stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n} type="button"
          className={`cform__star${n <= (hov || value) ? ' cform__star--on' : ''}`}
          onMouseEnter={() => setHov(n)}
          onMouseLeave={() => setHov(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <Star size={22} fill={n <= (hov || value) ? 'currentColor' : 'none'} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };

export default function Contact() {
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' });
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); 
    emailjs.send(
      'service_hlafnig',
      'template_opjndoe',
      {
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        from_position: form.position,
        message: form.message,
        rating: rating,
      },
      'dyYo8ej2s4J8Od2Hx'
    )
   };

  return (
    <section id="contact" className="contact" aria-label="Contact us">
      <div className="container">

        {/* Header */}
        <motion.div ref={headerRef} className="contact__header"
          variants={stagger} initial="hidden" animate={headerInView ? 'visible' : 'hidden'}>
          <motion.span className="contact__label" variants={fadeUp}>Contact Us</motion.span>
          <motion.h2 className="contact__heading" variants={fadeUp}>Get In Touch</motion.h2>
          <motion.p className="contact__sub" variants={fadeUp}>
            We would love to hear from you. Reach out for orders, business inquiries, or customer support.
          </motion.p>
        </motion.div>

        <div className="contact__body">

          {/* LEFT — info cards */}
          <motion.div ref={leftRef} className="contact__left"
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            {INFO_CARDS.map((c) => <InfoCard key={c.id} {...c} />)}
          </motion.div>

          {/* RIGHT — form */}
          <motion.div ref={rightRef} className="contact__right"
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
            <form className="cform" onSubmit={submit} noValidate>
              <h3 className="cform__title">Share Your Feedback</h3>

              <div className="cform__row">
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" type="text" className="cform__input"
                    placeholder="Your full name" value={form.name} onChange={set} required />
                </div>
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" className="cform__input"
                    placeholder="your@email.com" value={form.email} onChange={set} />
                </div>
              </div>

              <div className="cform__row">
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-phone">Phone</label>
                  <input id="cf-phone" name="phone" type="tel" className="cform__input"
                    placeholder="+251 ..." value={form.phone} onChange={set} />
                </div>
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-pos">Position / Client</label>
                  <input id="cf-pos" name="position" type="text" className="cform__input"
                    placeholder="e.g. Restaurant Owner" value={form.position} onChange={set} />
                </div>
              </div>

              <div className="cform__field">
                <label className="cform__lbl" htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" name="message" className="cform__input cform__textarea"
                  placeholder="Tell us about your experience or inquiry…"
                  rows={4} value={form.message} onChange={set} required />
              </div>

              <div className="cform__rating-row">
                <span className="cform__rating-lbl">Rate Your Experience</span>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <motion.button type="submit" className="cform__btn"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                disabled={!form.name || !form.message}>
                Send Feedback
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
