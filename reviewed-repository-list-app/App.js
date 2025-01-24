import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RepositoryList from './src/components/RepositoryList';
import AppBar from './src/components/AppBar';
import theme from './src/theme.js';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <RepositoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColors.mainBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
