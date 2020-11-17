import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#737380',
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    marginVertical: 12,
    borderRadius: 24,
  },
  footer: {},
});
