import {View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import useAuthenticatedUser from '../../hooks/useAuthenticatedUser';
import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    width: '100%',
    backgroundColor: '#24292e'
  },
  contentContainerStyle: {
    alignItems: "center",
  },
});

const Index = () => {
  const { user } = useAuthenticatedUser();
  const signOut = useSignOut();

  return <View style={styles.container}>
    <ScrollView horizontal scrollEnabled showsHorizontalScrollIndicator={false} style={{flexGrow: 1}} contentContainerStyle={styles.contentContainerStyle}>
      <AppBarTab text="Repositories" path="/" />
      <AppBarTab text="Sign in" path="/signIn" />
      { user ? <AppBarTab text="Sign out" onPress={signOut} /> : null }
    </ScrollView>
  </View>;
};

export default Index;