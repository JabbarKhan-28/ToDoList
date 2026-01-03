import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomAlert } from '../../components/CustomAlert';
import { TaskItem } from '../../components/TaskItem';
import { ThemedLayout } from '../../components/ThemedLayout';
import { COLORS, SHADOWS, SIZES, SPACING } from '../../constants/Theme';
import { useTasks } from '../../context/TaskContext';

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'info',
    onClose: () => {},
    onConfirm: undefined as undefined | (() => void),
    confirmText: 'OK',
    cancelText: 'Cancel'
  });

  const handleDelete = (id: string) => {
    setAlertConfig({
      visible: true,
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task?',
      type: 'warning',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onClose: () => setAlertConfig(prev => ({ ...prev, visible: false })),
      onConfirm: () => {
        deleteTask(id);
        setAlertConfig(prev => ({ ...prev, visible: false }));
      }
    });
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const incompleteTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  return (
    <ThemedLayout>
      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type as any}
        onClose={alertConfig.onClose}
        onConfirm={alertConfig.onConfirm}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>{incompleteTasks.length} pending</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={[...incompleteTasks, ...completedTasks]}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="clipboard-outline" size={64} color={COLORS.card} />
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        }
      />
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.md,
    height: 48,
    ...SHADOWS.card,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    height: '100%',
  },
  listContent: {
    padding: SPACING.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    marginTop: SPACING.md,
  },
});
