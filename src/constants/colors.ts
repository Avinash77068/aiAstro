// Centralized color constants for the Astro AI app
export const COLORS = {
  // Primary colors
  primary: '#FBBF24', // yellow-400
  primaryDark: '#F59E0B', // yellow-500
  
  // Background colors
  background: '#111827', // gray-900
  cardBackground: '#374151', // gray-800
  headerBackground: '#000000',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB', // gray-300
  textTertiary: '#9CA3AF', // gray-400
  textInverse: '#000000',
  
  // Status colors
  success: '#10B981', // green-500
  error: '#EF4444', // red-500
  warning: '#F59E0B', // yellow-500
  info: '#3B82F6', // blue-500
  
  // Gradient colors
  gradients: {
    blueToPurple: ['#1e3a8a', '#7c3aed'], // blue-900 to purple-900
    redToOrange: ['#dc2626', '#ea580c'], // red-900 to orange-900
  },
  
  // Border colors
  border: '#4B5563', // gray-700
  borderLight: '#374151', // gray-800
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Specific component colors
  notificationBadge: '#DC2626', // red-700
  verified: '#3B82F6', // blue-500
  freePrice: '#10B981', // green-500
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
