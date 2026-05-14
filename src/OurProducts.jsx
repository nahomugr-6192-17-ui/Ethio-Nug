import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import halfLtr from './assets/half-ltr.png';
import oneLtr from './assets/one-ltr.png';
import threeLtr from './assets/three-ltr.png';
import fiveLtr from './assets/five-ltr.png';
import twentyLtr from './assets/twenty-ltr.png';
import './OurProducts.css';
import { image } from 'framer-motion/client';

/* ─── Product data ──────────────────────────────── */
const PRODUCTS = [
  { size: '½ L',  label: 'Half Litre',     price: 'ETB 345',    tag: null     , image: halfLtr },
  { size: '1 L',  label: 'One Litre',      price: 'ETB 690',    tag: null     , image: oneLtr },
  { size: '3 L',  label: 'Three Litres',   price: 'ETB 2,070',   tag: null     , image: threeLtr },
  { size: '5 L',  label: 'Five Litres',    price: 'ETB 3,450',   tag: 'Popular', image: fiveLtr },
  { size: '20 L', label: 'Twenty Litres',  price: 'ETB 13,800', tag: 'Bulk'       , image: twentyLtr },
];

/* ─── Animation variants ────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const headerVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ─── Main Component ────────────────────────────── */
export default function OurProducts() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const headerRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const gridRef    = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <section id="products" className="products" aria-label="Our products">
      <div className="container">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          className="products__header"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.span className="products__label" variants={fadeUp}>
            Our Available Products
          </motion.span>
          <motion.h2 className="products__heading" variants={fadeUp}>
            Carefully Prepared{' '}
            <span className="products__heading-accent">Edible Oil</span>
          </motion.h2>
          <motion.p className="products__subheading" variants={fadeUp}>
            Premium-quality edible oil for homes, restaurants, and businesses.
          </motion.p>
        </motion.div>

        {/* ── Product Grid ── */}
        <div ref={gridRef} className="products__grid">
          {PRODUCTS.map((product, i) => {
            const isDimmed = !isMobile && hoveredIdx !== null && hoveredIdx !== i;
            const isActive = !isMobile && hoveredIdx === i;

            return (
              <motion.div
                key={product.size}
                className="products__card-wrap"
                initial={{ opacity: 0, y: 44 }}
                animate={
                  gridInView
                    ? { opacity: isDimmed ? 0.42 : 1, y: 0, scale: isDimmed ? 0.97 : 1 }
                    : { opacity: 0, y: 44, scale: 1 }
                }
                transition={{
                  opacity: { duration: isDimmed ? 0.28 : 0.7,  delay: isDimmed ? 0 : i * 0.1 + 0.12 },
                  y:       { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + 0.12 },
                  scale:   { duration: 0.28 },
                }}
                onHoverStart={() => !isMobile && setHoveredIdx(i)}
                onHoverEnd={()   => !isMobile && setHoveredIdx(null)}
              >
                <motion.div
                  className={`products__card${isActive ? ' products__card--active' : ''}`}
                  animate={isActive ? { y: -10 } : { y: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Tag badge */}
                  {product.tag && (
                    <span className="products__tag">{product.tag}</span>
                  )}

                  {/* Bottle image */}
                  <div className="products__img-wrap">
                    <motion.img
                      src={product.image}
                      alt={`Ethio-Nug ${product.size} edible oil bottle`}
                      className="products__bottle-img"
                      animate={
                        isActive
                          ? { y: -16, rotate: 3 }
                          : { y: [0, -7, 0], rotate: 0 }
                      }
                      transition={
                        isActive
                          ? { duration: 0.38, ease: 'easeOut' }
                          : {
                              duration: 2.8 + i * 0.18,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              repeatType: 'loop',
                            }
                      }
                    />
                  </div>

                  {/* Card body */}
                  <div className="products__card-body">
                    <div className="products__meta">
                      <span className="products__size">{product.size}</span>
                      <span className="products__size-label">{product.label}</span>
                    </div>
                    <span className="products__price">{product.price}</span>
                  </div>

                  {/* CTA */}
                  <div className="products__card-footer">
                    <motion.a
                      href="#contact"
                      className="products__btn"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 340, damping: 18 }}
                    >
                      <ShoppingBag size={14} strokeWidth={2.2} />
                      Order Today
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}