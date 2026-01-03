import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING } from '../constants/Theme';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const ThemedButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  loading = false
}: ThemedButtonProps) => {
  
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary': return COLORS.card;
      case 'danger': return COLORS.danger;
      case 'success': return COLORS.success;
      default: return COLORS.primary;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm': return SPACING.sm;
      case 'lg': return SPACING.xl;
      default: return SPACING.md;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor(), padding: getPadding() },
        variant === 'primary' && SHADOWS.button
      ]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} />
      ) : (
        <Text style={[styles.text, { fontSize: size === 'lg' ? 18 : 16 }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  text: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
