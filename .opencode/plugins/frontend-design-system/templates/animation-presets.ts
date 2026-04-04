/**
 * Animation Presets
 * Copy to: src/lib/animations.ts
 */

// ========================================
// Easing Curves
// ========================================

/**
 * Semantic easing curves from Ant Design, Fluent UI, Uniswap
 */
export const curves = {
  /** Fast start, slow end - for enter animations */
  snappy: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  
  /** Overshoot and return - for playful interactions */
  bouncy: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  
  /** Smooth ease-out - for standard transitions */
  gentle: 'cubic-bezier(0.23, 1, 0.32, 1)',
  
  /** Anticipatory pull-back - for dramatic entrances */
  anticipate: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
  
  /** Linear - for continuous animations */
  linear: 'linear',
} as const;

// ========================================
// Durations
// ========================================

/**
 * Semantic durations by interaction type
 */
export const durations = {
  /** Tooltips, quick feedback */
  instant: 100,
  
  /** Color/opacity changes */
  fast: 150,
  
  /** Standard hover/focus */
  base: 200,
  
  /** Transform animations */
  moderate: 300,
  
  /** Page transitions */
  slow: 500,
  
  /** Complex morphing */
  slower: 800,
} as const;

// ========================================
// Spring Presets (Framer Motion)
// ========================================

/**
 * Spring configurations for Framer Motion
 */
export const springs = {
  /** Quick, responsive feedback */
  snappy: { stiffness: 400, damping: 30, mass: 1 },
  
  /** Soft, gentle motion */
  gentle: { stiffness: 200, damping: 20, mass: 1 },
  
  /** Playful overshoot */
  bouncy: { stiffness: 300, damping: 10, mass: 1 },
  
  /** Minimal bounce */
  stiff: { stiffness: 500, damping: 30, mass: 1 },
  
  /** Slow, heavy feel */
  heavy: { stiffness: 100, damping: 30, mass: 2 },
} as const;

// ========================================
// Interaction Presets
// ========================================

/**
 * Pre-built interaction configurations for Framer Motion
 */
export const interactions = {
  /** Card hover - subtle lift effect */
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98, y: 0 },
  },
  
  /** Button press - tactile feedback */
  buttonPress: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.95 },
  },
  
  /** Icon button - stronger feedback */
  iconButton: {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  },
  
  /** Fade in from below */
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  
  /** Scale in from center */
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  /** Slide in from right */
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
} as const;

// ========================================
// Stagger Configurations
// ========================================

/**
 * Stagger animation configurations for lists
 */
export const stagger = {
  /** Fast stagger for small lists */
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  },
  
  /** Standard stagger for medium lists */
  standard: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  },
  
  /** Slow stagger for large lists or emphasis */
  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
} as const;

/**
 * Child item for stagger animations
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

// ========================================
// Utility Functions
// ========================================

/**
 * Get transition config with semantic names
 */
export function getTransition(
  property: string,
  duration: keyof typeof durations = 'base',
  curve: keyof typeof curves = 'gentle'
): string {
  return `${property} ${durations[duration]}ms ${curves[curve]}`;
}

/**
 * Get spring config with semantic names
 */
export function getSpring(preset: keyof typeof springs = 'gentle') {
  return {
    type: 'spring' as const,
    ...springs[preset],
  };
}