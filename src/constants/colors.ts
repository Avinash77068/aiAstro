// Centralized color constants for the Astro AI app (Logo based theme)
export const COLORS = {
  // 🌟 Primary brand colors (from logo)
  primary: '#edb33eff', // Gold (CTA, highlights)
  primaryDark: '#D9A027', // Dark gold

  // 🌌 Background colors (galaxy theme)
  background: '#1B1145', // Deep galaxy blue
  cardBackground: 'rgba(255,255,255,0.08)', // Glassmorphism
  headerBackground: '#2A145D', // Deep purple

  // 📝 Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#E6E1FF', // Soft lavender
  textTertiary: '#B6AFFF', // Muted purple
  textInverse: '#3B1A78',

  // ✅ Status colors (aligned with theme)
  success: '#4ADE80', // Soft green
  error: '#F87171', // Soft red
  warning: '#F5B942', // Gold
  info: '#A78BFA', // Purple accent

  // 🌈 Gradient colors
  gradients: {
    galaxy: ['#1B1145', '#3B1A78', '#6A35FF'],
    goldGlow: ['#FFD77A', '#F5B942', '#D9A027'],
  },

  // 🧱 Borders
  border: 'rgba(255,255,255,0.15)',
  borderLight: 'rgba(255,255,255,0.08)',

  // 🌑 Shadow
  shadow: 'rgba(0, 0, 0, 0.4)',

  // 🕶 Overlay
  overlay: 'rgba(27,17,69,0.7)',

  // 🔔 Component specific
  notificationBadge: '#EF4444',
  verified: '#F5B942',
  freePrice: '#4ADE80',
};

// Text sizes
export const TEXT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 36,
};

// Font weights
export const FONT_WEIGHTS = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Spacing constants
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

// Border radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Common styles
export const COMMON_STYLES = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Card styles
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
  },

  // Button styles
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },

  buttonSecondary: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },

  // Text styles
  textPrimary: {
    color: COLORS.textPrimary,
    fontSize: TEXT_SIZES.base,
  },

  textSecondary: {
    color: COLORS.textSecondary,
    fontSize: TEXT_SIZES.sm,
  },

  textTertiary: {
    color: COLORS.textTertiary,
    fontSize: TEXT_SIZES.sm,
  },

  // Input styles
  input: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.md,
    color: COLORS.textPrimary,
  },

  // Banner styles
  banner: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING['2xl'],
    alignItems: 'center',
  },

  // Grid styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridItem: {
    width: '30%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
};
