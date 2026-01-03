import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/Theme';

interface ThemedLayoutProps {
  children: ReactNode;
  withSafeArea?: boolean;
}

export const ThemedLayout = ({ children, withSafeArea = true }: ThemedLayoutProps) => {
  const Container = withSafeArea ? SafeAreaView : View;

  return (
    <Container style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
    backgroundColor: COLORS.background,
  },
});
