import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING } from '../constants/Theme';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
}

export const CustomAlert = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
}: CustomAlertProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={[styles.title, type === 'error' && styles.errorTitle]}>
            {title}
          </Text>
          <Text style={styles.message}>
            {message}
          </Text>

          <View style={styles.buttonContainer}>
            {onConfirm ? (
              <>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.confirmButton, type === 'error' && styles.errorButton]} 
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity 
                style={[styles.button, styles.confirmButton]} 
                onPress={onClose}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  alertContainer: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.xl,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.card,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  errorTitle: {
    color: COLORS.danger,
  },
  message: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
  },
  button: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: SIZES.borderRadiusSmall,
    minWidth: 100,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  errorButton: {
    backgroundColor: COLORS.danger,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  confirmButtonText: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
    fontSize: 16,
  },
});
