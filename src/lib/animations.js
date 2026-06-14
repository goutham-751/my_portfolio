export const EASING = {
  smooth:   [0.16, 1, 0.3, 1],
  dramatic: [0.76, 0, 0.24, 1],
  spring:   { type: 'spring', stiffness: 300, damping: 30 }
};

export const DURATION = { fast: 0.2, normal: 0.4, slow: 0.7, dramatic: 1.2 };

/* Reusable Framer Motion variants */
export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASING.smooth, delay: i * 0.08 }
  }),
};

export const maskReveal = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.8, ease: EASING.smooth } },
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
