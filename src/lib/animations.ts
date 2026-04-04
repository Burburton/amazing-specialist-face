/**
 * Animation Presets
 * Based on frontend-design-system plugin guidance
 * Style: Developer Tool / Technical Documentation
 */

// ========================================
// Easing Curves (语义化)
// ========================================

export const curves = {
  default: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// ========================================
// Durations (语义化)
// ========================================

export const durations = {
  instant: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
} as const;

// ========================================
// Interaction Presets
// ========================================

export const interactions = {
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -4 },
    tap: { scale: 0.98, y: 0 },
  },
  
  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.95 },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
} as const;

// ========================================
// Stagger Configurations
// ========================================

export const stagger = {
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  },
  
  normal: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  
  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
} as const;

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: curves.default },
  },
};

// ========================================
// Utility Functions
// ========================================

export function getTransition(
  properties: string | string[],
  duration: keyof typeof durations = 'normal',
  curve: keyof typeof curves = 'default'
): string {
  const props = Array.isArray(properties) ? properties : [properties];
  const d = durations[duration];
  const c = curves[curve];
  
  return props.map(p => `${p} ${d}ms ${c}`).join(', ');
}

// ========================================
// CSS-in-JS Helpers
// ========================================

export const transition = {
  none: 'none',
  all: `all ${durations.normal}ms ${curves.default}`,
  colors: getTransition(['color', 'background-color', 'border-color'], 'fast'),
  opacity: getTransition('opacity', 'fast'),
  transform: getTransition('transform', 'normal', 'spring'),
  shadow: getTransition('box-shadow', 'normal'),
} as const;

// ========================================
// Keyframes (for CSS)
// ========================================

export const keyframes = {
  fadeIn: `
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  
  fadeInUp: `
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  `,
  
  pulse: `
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  `,
  
  shimmer: `
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  `,
  
  spin: `
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,
} as const;