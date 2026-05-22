import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Send, MessageCircle, Star } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, {Toaster} from 'react-hot-toast';
import './Contact.css';
import en from './Translation/en.js';
import am from './Translation/am.js';

const INFO_CARDS = [
  {
    id: 'phone',
    icon: Phone,
    href: null,
  },
  {
    id: 'location',
    icon: MapPin,
    href: 'https://maps.app.goo.gl/8jGuPBFsBjAXR8xn8?g_st=ac',
  },
  {
    id: 'telegram',
    icon: Send,
    href: 'https://t.me/stackminds',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    href: 'https://wa.me/17025610844',
  },
];

function InfoCard({ icon: Icon, label, primary, secondary, href, badge, id, setShowPhoneOptions}) {

  if (id === 'phone') {
  return (
    <motion.div
      className="cinfo"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setShowPhoneOptions(true)}
      role="button"
      tabIndex={0}
    >
      <div className="cinfo__icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="cinfo__body">
        <span className="cinfo__label">
          {label}
          {badge && <span className="cinfo__badge">{badge}</span>}
        </span>

        <span className="cinfo__primary">{primary}</span>
        <span className="cinfo__secondary">{secondary}</span>
      </div>
    </motion.div>
  );
}

  const isExternal = href?.startsWith('http');

  return (
    <motion.a
      href={href}
      className="cinfo"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cinfo__icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div className="cinfo__body">
        <span className="cinfo__label">
          {label}
          {badge && <span className="cinfo__badge">{badge}</span>}
        </span>

        <span className="cinfo__primary">{primary}</span>

        {secondary && (
          <span className="cinfo__secondary">{secondary}</span>
        )}
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

export default function Contact({ lang }) {
  const t = lang === 'am' ? am : en;

  const CARD_CONTENT = {
    phone: t.contact.cards.phone,
    location: t.contact.cards.location,
    telegram: t.contact.cards.telegram,
    whatsapp: t.contact.cards.whatsapp,
  };

  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const leftRef = useRef(null);
  const leftInView = useInView(leftRef, { once: true, margin: '-80px' });
  const rightRef = useRef(null);
  const rightInView = useInView(rightRef, { once: true, margin: '-80px' });

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const [sending, setSending] = useState(false);

const submit = async (e) => {
  e.preventDefault();

  if (rating === 0) {
    alert(t.contact.form.ratingError);
    return;
  }

  setSending(true);

  try {
    await emailjs.send(
      'service_aolqk5c',
      'template_gdwli0j',
      {
        from_name: form.name,
        from_email: form.email,
        phone: form.phone,
        position: form.position,
        message: form.message,
        rating: rating,
      },
      '0vp6GZV5GGLAIBB-O'
    );

    toast.success(t.contact.form.success);

    setForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      message: '',
    });

    setRating(0);

  }  catch (error) {
  console.log('EMAIL ERROR:', error);

  if (error.text) {
    toast.error(error.text);
  } else {
    toast.error(t.contact.form.error);
  }
}

  setSending(false);
};

  return (
    <section id="contact" className="contact" aria-label="Contact us">
      <Toaster
        position="center"
        toastOptions={{
          className: 'custom-toast',
        }}
      />
      <div className="container">

        {/* Header */}
        <motion.div ref={headerRef} className="contact__header"
          variants={stagger} initial="hidden" animate={headerInView ? 'visible' : 'hidden'}>
          <motion.span className="contact__label" variants={fadeUp}>{t.contact.label}</motion.span>
          <motion.h2 className="contact__heading" variants={fadeUp}>{t.contact.heading}</motion.h2>
          <motion.p className="contact__sub" variants={fadeUp}>
            {t.contact.subheading}
          </motion.p>
        </motion.div>

        <div className="contact__body">

          {showPhoneOptions && (
            <div
              className="phone-modal-overlay"
              onClick={() => setShowPhoneOptions(false)}
            >
              <motion.div
                className="phone-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="phone-modal__title">
                  {t.contact.modal.title}
                </h3>

                <a
                  href="tel:+251911979899"
                  className="phone-modal__btn"
                >
                  +251 91 1979 899
                </a>

                <a
                  href="tel:+251982323334"
                  className="phone-modal__btn"
                >
                  +251 98 2323 334
                </a>

                <button
                  className="phone-modal__close"
                  onClick={() => setShowPhoneOptions(false)}
                >
                  {t.contact.modal.cancel}
                </button>
              </motion.div>
            </div>
          )}

          {/* LEFT — info cards */}
          <motion.div ref={leftRef} className="contact__left"
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            {INFO_CARDS.map((c) => (
              <InfoCard
                key={c.id}
                {...c}
                {...CARD_CONTENT[c.id]}
                setShowPhoneOptions={setShowPhoneOptions}
              />
            ))}
          </motion.div>

          {/* RIGHT — form */}
          <motion.div ref={rightRef} className="contact__right"
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
            <form className="cform" onSubmit={submit} noValidate>
              <h3 className="cform__title">{t.contact.form.title}</h3>

              <div className="cform__row">
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-name">{t.contact.form.fullName}</label>
                  <input id="cf-name" name="name" type="text" className="cform__input"
                    placeholder={t.contact.form.fullNamePlaceholder} value={form.name} onChange={set} required />
                </div>
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-email">{t.contact.form.email}</label>
                  <input id="cf-email" name="email" type="email" className="cform__input"
                    placeholder={t.contact.form.emailPlaceholder} value={form.email} onChange={set} />
                </div>
              </div>

              <div className="cform__row">
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-phone">{t.contact.form.phone}</label>
                  <input id="cf-phone" name="phone" type="tel" className="cform__input"
                    placeholder={t.contact.form.phonePlaceholder} value={form.phone} onChange={set} />
                </div>
                <div className="cform__field">
                  <label className="cform__lbl" htmlFor="cf-pos">{t.contact.form.position}</label>
                  <input id="cf-pos" name="position" type="text" className="cform__input"
                    placeholder={t.contact.form.positionPlaceholder} value={form.position} onChange={set} />
                </div>
              </div>

              <div className="cform__field">
                <label className="cform__lbl" htmlFor="cf-msg">{t.contact.form.message}</label>
                <textarea id="cf-msg" name="message" className="cform__input cform__textarea"
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={4} value={form.message} onChange={set} required />
              </div>

              <div className="cform__rating-row">
                <span className="cform__rating-lbl">{t.contact.form.rating}</span>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              <motion.button type="submit" className="cform__btn"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                disabled={!form.name || !form.message || rating === 0 || sending}>
                {sending ? 'Sending...' : 'Submit Feedback'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
