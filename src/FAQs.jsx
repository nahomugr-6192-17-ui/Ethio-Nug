import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight, Phone, MessageCircle } from "lucide-react";
import "./FAQs.css";
import en from "./Translation/en.js";
import am from "./Translation/am.js";
import LocalizedText from "./LocalizedText.jsx";

/* ─── Single FAQ card Component ────────────────────────── */
function FaqCard({ item, isOpen, onToggle, lang, t }) {
  const answer =
    item.a !== null ? (
      item.a
    ) : (
      <div className="faq__contact">
        <p>
          <LocalizedText lang={lang} type="body">
            {t.faqs.contactText}
          </LocalizedText>
        </p>

        <a href="tel:+251911979899" className="faq__contact-item">
          <Phone size={16} />
          +251 911 979 899
        </a>

        <a href="tel:+251982323334" className="faq__contact-item">
          <Phone size={16} />
          +251 982 323 334
        </a>

        <a
          href="https://maps.app.goo.gl/8jGuPBFsBjAXR8xn8?g_st=ac"
          target="_blank"
          rel="noopener noreferrer"
          className="faq__contact-item"
        >
          <MapPin size={16} />
          Visit our factory
        </a>

        <a href="#contact" className="faq__contact-btn">
          Contact Us →
        </a>
      </div>
    );

  return (
    <motion.div
      className={`faq__card${isOpen ? " faq__card--open" : ""}`}
      animate={isOpen ? { scale: 1.01 } : { scale: 1 }}
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
        >
          <ChevronRight size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq__answer-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p className="faq__answer">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────── */
export default function FAQs({ lang }) {
  const t = lang === "am" ? am : en;

  // 1. Data Mapping
  const faqData = {
    about: t.faqs.about,
    production: t.faqs.production,
    orders: t.faqs.orders,
    storage: t.faqs.storage,
  };

  const ALL_QUESTIONS = [
    ...t.faqs.about,
    ...t.faqs.production,
    ...t.faqs.storage,
    ...t.faqs.orders,
  ];

  const FAQ_GROUPS = [ALL_QUESTIONS.slice(0, 5), ALL_QUESTIONS.slice(5, 11)];

  // 2. States
  const [activeCategory, setActiveCategory] = useState("about");
  const [openId, setOpenId] = useState(null);
  const [mobIdx, setMobIdx] = useState(0);
  const [mobOpen, setMobOpen] = useState(null);
  const [isListVisible, setIsListVisible] = useState(false);

  // 3. Refs & Animation Logic
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const touchStartX = useRef(null);

  // 4. Swipe Functions
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) {
      const dir = dx > 0 ? 1 : -1;
      setMobIdx((p) => (p + dir + FAQ_GROUPS.length) % FAQ_GROUPS.length);
      setMobOpen(null);
    }
    touchStartX.current = null;
  };
  const handleCick = (Catagory) => {
    setActiveCategory(Catagory);
    setOpenId(null);
    setIsListVisible(true);
  };

  return (
    <section id="faqs" className="faqs">
      <div className="container">
        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="faqs__header"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="faqs__label">{t.faqs.label}</span>
          <h2 className="faqs__heading">
            {t.faqs.headingTop}
            <br />
            <span className="faqs__heading-accent">{t.faqs.headingAccent}</span>
          </h2>
          <p className="faqs__sub">{t.faqs.subheading}</p>
        </motion.div>

        <div className="faq-container">
          {/* --- SIDEBAR AREA --- */}
          <div className="faq-sidebar">
            <h3 className="sidebar-title">{t.faqs.browseByCategory}</h3>

            {["about", "orders", "storage", "production"].map((catKey) => (
              <div key={catKey} className="category-group">
                {/* Category Button */}
                <button
                  className={`sidebar-btn ${activeCategory === catKey ? "active" : ""}`}
                  onClick={() => {
                    if (activeCategory === catKey && isListVisible)
                      setIsListVisible(false);
                    else handleCick(catKey);
                  }}
                >
                  {catKey === "about" && t.faqs.card.q1}
                  {catKey === "orders" && t.faqs.card.q2}
                  {catKey === "storage" && t.faqs.card.q3}
                  {catKey === "production" && t.faqs.card.q4}
                  <span className="arrow">→</span>
                </button>

                {/* --- MOBILE ONLY: Questions appear nested here (< 1000px) --- */}
                <div
                  className={`mobile-nested-list ${activeCategory === catKey && isListVisible ? "show" : ""}`}
                >
                  {faqData[catKey].map((item) => (
                    <FaqCard
                      key={item.id}
                      item={item}
                      lang={lang}
                      t={t}
                      isOpen={openId === item.id}
                      onToggle={() =>
                        setOpenId(openId === item.id ? null : item.id)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Footer stays at the bottom of the sidebar area on Desktop, 
        and at the bottom of the whole thing on Mobile */}
            <div className="sidebar-footer">
              <h4>{t.faqs.card.q5}</h4>
              <p>{t.faqs.card.q6}</p>
              <a href="#contact" className="sidebar-btn active small-btn">
                {t.faqs.contactBtn}
              </a>
            </div>
          </div>

          {/* --- DESKTOP ONLY: Questions appear on the right (> 1000px) --- */}
          <div
            className={`questions-list-desktop ${isListVisible ? "visible" : ""}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "800px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {faqData[activeCategory].map((item) => (
                  <FaqCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    t={t}
                    isOpen={openId === item.id}
                    onToggle={() =>
                      setOpenId(openId === item.id ? null : item.id)
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* ── Mobile Layout ── */}
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
              className="faqs__mobile-card"
            >
              {FAQ_GROUPS[mobIdx].map((item) => (
                <FaqCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  t={t}
                  isOpen={mobOpen === item.id}
                  onToggle={() =>
                    setMobOpen(mobOpen === item.id ? null : item.id)
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="faqs__dots">
            {FAQ_GROUPS.map((_, i) => (
              <button
                key={i}
                className={`faqs__dot${i === mobIdx ? " faqs__dot--on" : ""}`}
                onClick={() => {
                  setMobIdx(i);
                  setMobOpen(null);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
