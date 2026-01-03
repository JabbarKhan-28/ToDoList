import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomAlert } from '../../components/CustomAlert';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedLayout } from '../../components/ThemedLayout';
import { COLORS, SIZES, SPACING } from '../../constants/Theme';
import { useTasks } from '../../context/TaskContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    onClose: () => {},
  });

  const handleCreate = () => {
    if (!title.trim()) {
      setAlertConfig({
        visible: true,
        title: 'Error',
        message: 'Please enter a task title',
        type: 'error',
        onClose: () => setAlertConfig(prev => ({ ...prev, visible: false })),
      });
      return;
    }

    addTask(title, detail);
    setAlertConfig({
      visible: true,
      title: 'Success',
      message: 'Task added successfully',
      type: 'success',
      onClose: () => {
        setAlertConfig(prev => ({ ...prev, visible: false }));
        router.back();
      },
    });
  };

  return (
    <ThemedLayout>
      <CustomAlert 
        {...alertConfig}
        onClose={alertConfig.onClose}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Task</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Details (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add some details..."
              placeholderTextColor={COLORS.textSecondary}
              value={detail}
              onChangeText={setDetail}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.footer}>
            <ThemedButton 
              title="Create Task" 
              onPress={handleCreate} 
              size="lg"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  form: {
    flex: 1,
    padding: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.xl,
  },
  label: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    color: COLORS.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 120,
  },
  footer: {
    marginTop: 'auto',
  },
});
