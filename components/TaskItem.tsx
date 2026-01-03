import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING } from '../constants/Theme';
import { Task } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.contentContainer} 
        onPress={() => onToggle(task.id)}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <Ionicons name="checkmark" size={16} color={COLORS.text} />}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          {task.detail ? (
            <Text style={styles.detail} numberOfLines={2}>
              {task.detail}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  detail: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
});
