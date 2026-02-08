// Centralized color constants for the Astro AI app (Logo based theme)
export const COLORS = {
  // 🌟 Primary brand colors (Gold CTA)
  primary: '#EDB33E', // Gold CTA
  primaryDark: '#D9A027', // Dark gold
  primarySoft: '#FFF3D6', // Soft gold background

  // 🌌 Background colors (Clean + Calm)
  background: '#FFFFFF',
  cardBackground: '#F6F3FF', // Very light lavender
  headerBackground: '#FFFFFF',

  // 📝 Text colors (Readable on white)
  textPrimary: '#111827', // Almost black
  textSecondary: '#4B5563', // Gray
  textTertiary: '#6B7280', // Lighter gray
  textInverse: '#FFFFFF',

  // 🎨 Accent colors (Spiritual purple/indigo)
  accentPurple: '#6A35FF',
  accentIndigo: '#4338CA',
  accentLavender: '#EDE9FE',

  // ✅ Status colors (soft)
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#8B5CF6',

  // 🌈 Gradients (light, not heavy)
  gradients: {
    spiritual: ['#FFFFFF', '#F6F3FF', '#EDE9FE'],
    goldGlow: ['#FFF7E6', '#FFD77A', '#EDB33E'],
  },

  // 🧱 Borders (light)
  border: 'rgba(17, 24, 39, 0.10)',
  borderLight: 'rgba(17, 24, 39, 0.06)',

  // 🌑 Shadow (soft)
  shadow: 'rgba(17, 24, 39, 0.12)',

  // 🕶 Overlay (very light)
  overlay: 'rgba(17, 24, 39, 0.25)',

  // 🔔 Component specific
  notificationBadge: '#EF4444',
  verified: '#EDB33E',
  freePrice: '#22C55E',
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
  '2xl': 24,
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
